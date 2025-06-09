import { BadRequestException, Injectable } from "@nestjs/common";
import { RedisService } from "src/core/database/redis.service";
import { generate } from "otp-generator";

@Injectable()
export class OtpService{ 
    constructor(private redis: RedisService) { }
    
    private generateOtp() {
        const otp = generate(4, {
            digits: true,
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false
        });
        return otp;
    }

    async sendOtp(phone: string) {
        await this.checkOtp(`user:${phone}`);
        const tempOtp = this.generateOtp();
        const responseRedis = await this.redis.setOtp(phone, tempOtp);
        if (responseRedis == 'ok') {
            return tempOtp;
        }
    }
    
    async checkOtp(key: string) {
        const checkOtp = await this.redis.getOtp(key);
        if (checkOtp) {
            const ttl = await this.redis.getTTl(key);
            throw new BadRequestException(`Please try again after ${ttl} seconds`);
        }
    }

    async verifyOtpSendedCode(key: string, code: string) {
        const otp = await this.redis.getOtp(key);
        if (!otp || otp !== code) throw new BadRequestException('Code invalid');
        await this.redis.delOtp(key);
        return true;
    }   
}
