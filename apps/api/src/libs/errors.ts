export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "AuthError";
  }
}

export class GuestWallError extends AppError {
  constructor(message: string, status: number) {
    super(message, status);
    this.name = "GuestWallError";
  }
}
