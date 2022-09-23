import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.model'
import { AuthService } from '../auth/auth.service'
import sequelize from 'sequelize'

@Module({
  controllers: [UsersController],
  providers: [AuthService, UsersService],
  imports: [
    SequelizeModule.forFeature([User], {
      define: {
        indexes: [{
          fields: [sequelize.fn('lower', sequelize.col('username'))]
        }]
      }
    })
  ]
})
export class UsersModule {}