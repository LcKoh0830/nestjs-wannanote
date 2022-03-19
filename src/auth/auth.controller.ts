import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SkipJWT } from 'src/guard.decorator';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @SkipJWT()
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @SkipJWT()
  @Post('register')
  @HttpCode(200)
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }
}
