import sequelize from 'sequelize'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller'

// import models
import { User } from './users.model'
import { ContactAttemp } from '../contactAttemp/contactAttemp.model'

// import services
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { ContactAttempService } from '../contactAttemp/contactAttemp.service'
import { ContactBan } from '../ContactBan/contactBan.model'
import { ContactBanService } from '../ContactBan/contactBan.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'


@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, ContactAttempService, ContactBanService],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const signOption = {
          secret: configService.get("JWT").SECRET,
          signOptions: {
            expiresIn: configService.get("JWT").EXPIRES_IN,
          }
        }
        return signOption
      },
      inject: [ConfigService]
    }),
    SequelizeModule.forFeature([User, ContactAttemp, ContactBan], {
      define: {
        indexes: [{
          fields: [sequelize.fn('lower', sequelize.col('username'))]
        }]
      }
    })
  ],
  exports: [UsersService]
})
export class UsersModule {}