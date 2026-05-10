export class UnauthorizedException extends Error {
  private status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}
