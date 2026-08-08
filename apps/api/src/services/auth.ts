import { randomBytes } from "crypto";
import { prisma } from "../libs/prisma";
import { SESSION_DURATION_MS } from "../plugins/session";

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

function generateSessionToken() {
  return randomBytes(32).toString("hex");
}

async function createSession(userId: string) {
  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: { token, userId, expiresAt },
  });

  return { token, expiresAt };
}

export async function registerUser(data: {
  displayName?: string;
  username: string;
  email: string;
  password: string;
}) {
  const username = data.username.toLowerCase().trim();
  const email = data.email.toLowerCase().trim();

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingUser) {
    throw new AuthError("Username or email already in use", 409);
  }

  const passwordHash = await Bun.password.hash(data.password, "argon2id");

  const user = await prisma.user.create({
    data: {
      displayName: data.displayName?.trim(),
      username,
      email,
      passwordHash,
    },
  });

  const session = await createSession(user.id);

  return {
    session,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    },
  };
}

export async function loginUser(data: { email: string; password: string }) {
  const email = data.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AuthError("Invalid email or password", 401);
  }

  const isPasswordValid = await Bun.password.verify(
    data.password,
    user.passwordHash,
    "argon2id",
  );

  if (!isPasswordValid) {
    throw new AuthError("Invalid email or password", 401);
  }

  const session = await createSession(user.id);

  return {
    session,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    },
  };
}

export async function logoutUser(token: string) {
  await prisma.session.deleteMany({ where: { token } });
}
