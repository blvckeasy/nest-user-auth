import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule, JwtService, JwtModuleOptions } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const signOption = {
        secret: configService.get("JWT").SECRET,
          signOptions: {
            expiresIn: configService.get("JWT").EXPIRES_IN,
          },
        }
        return signOption
      },
      inject: [ConfigService]
    })    
  ],
})
export class AuthModule {}
