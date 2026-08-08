import { prisma } from "../libs/prisma";

export async function registerUser(
  data: {
    displayName?: string;
    username: string;
    email: string;
    password: string;
  },
  sign: (payload: object) => Promise<string>,
) {
  const username = data.username.toLowerCase().trim();
  const email = data.email.toLowerCase().trim();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    throw new Error("Username or email already in use");
  }

  const passwordHash = await Bun.password.hash(data.password);

  const user = await prisma.user.create({
    data: {
      displayName: data.displayName?.trim(),
      username,
      email,
      passwordHash,
    },
  });

  const token = await sign({
    sub: user.id,
    username: user.username,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    },
  };
}

export async function loginUser(
  data: {
    email: string;
    password: string;
  },
  sign: (payload: object) => Promise<string>,
) {
  const email = data.email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await Bun.password.verify(
    user.passwordHash,
    data.password,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = await sign({
    sub: user.id,
    username: user.username,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    },
  };
}
