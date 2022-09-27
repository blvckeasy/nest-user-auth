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


@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, ContactAttempService, ContactBanService],
  imports: [
    SequelizeModule.forFeature([User, ContactAttemp, ContactBan], {
      define: {
        indexes: [{
          fields: [sequelize.fn('lower', sequelize.col('username'))]
        }]
      }
    })
  ]
})
export class UsersModule {}