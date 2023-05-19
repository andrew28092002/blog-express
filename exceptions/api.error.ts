export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    return new ApiError(401, "Unauthorizated");
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string) {
    return new ApiError(404, message);
  }
}
