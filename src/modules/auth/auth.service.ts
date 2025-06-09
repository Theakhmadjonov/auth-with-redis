import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { OtpService } from './otp.service';
import { PrismaService } from 'src/core/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto, verifyOtp } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private otp: OtpService,
    private db: PrismaService,
    private jwt: JwtService
  ) { }
  
  async sendOtp(createAurhDto: CreateAuthDto) {
    const findUser = await this.db.prisma.user.findUnique({ where: { phone: createAurhDto.phone } });
    if (findUser) throw new ConflictException('User alreday exists');
    const res = await this.otp.sendOtp(createAurhDto.phone);
    console.log(res);
    if (!res) throw new InternalServerErrorException('Server error');
    return {
      message: "Code sended",
    };
  }

  async verifyOtp(data: verifyOtp) {
    const key = `user:${data.phone}`
    await this.otp.verifyOtpSendedCode(key, data.code)
    return {
      message: "success",
    }
  }
}
