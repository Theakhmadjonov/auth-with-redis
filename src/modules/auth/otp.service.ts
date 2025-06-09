import { Injectable } from "@nestjs/common";
import { RedisService } from "src/core/database/redis.service";
import { generate } from "otp-generator";

@Injectable()
export class OtpService{ 
    constructor(private redis: RedisService) { }
    
    generateOtp() {
        const otp = generate(4, {
            digits: true,
            lowerCaseAlphabets: false,
            specialChars: false,
            upperCaseAlphabets: false
        });
        return otp;
    }

    
}
