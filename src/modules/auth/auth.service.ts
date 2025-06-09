import { ConflictException, Injectable } from '@nestjs/common';
import { OtpService } from './otp.service';
import { PrismaService } from 'src/core/database/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

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
    
  }

}
