import jwt from "jsonwebtoken"

export class JwtService {
  private readonly secret: string;
  constructor() {
    this.secret = process.env.JWT_SECRET || "secret";
  }
  sign(payload: any, options?: any) {
    return jwt.sign(payload, this.secret, options);
  }
  verify(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}