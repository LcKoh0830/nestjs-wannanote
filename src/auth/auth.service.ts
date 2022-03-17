import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO } from './dto/register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new HttpException(
      'username or password mismatch',
      HttpStatus.FORBIDDEN,
    );
  }

  async login(user: any) {
    const payload = { username: user.username, user_id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(registerDTO: RegisterDTO): Promise<any> {
    return this.usersService.create(registerDTO);
  }
}
