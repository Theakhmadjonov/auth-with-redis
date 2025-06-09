import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, verifyOtp } from './dto/create-auth.dto';
import { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  async sendOtp(@Body() createAuthDto: CreateAuthDto) {
    try {
      const response = await this.authService.sendOtp(createAuthDto);
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify-otp')
  async verifyOtp(@Body() data: verifyOtp) {
    try {
      const response = await this.authService.verifyOtp(data);
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  async register(@Res({ passthrough: true }) res: Response) {
    try {
      const token = 'ccc';
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 2 * 3600 * 1000,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login() {}
}
