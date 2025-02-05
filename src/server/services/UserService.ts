import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../utils/error';

export class UserService {
  async register(email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, 'Email already registered');
    }

    const user = await User.create({ email, password });
    return this.generateToken(user.id);
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AppError(401, 'Invalid credentials');
    }

    return this.generateToken(user.id);
  }

  private generateToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: '7d'
    });
  }
}