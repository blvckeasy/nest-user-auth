import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get("JWT").JWT_SECRET,
        signOptions: { 
          expiresIn: configService.get("JWT").JWT_EXPIRES_IN
        }
      }),
      inject: [ConfigService]
    }),
  ],
})
export class AuthModule {}
