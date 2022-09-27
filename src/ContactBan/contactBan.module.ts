import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { ContactBanController } from './contactBan.controller'
import { ContactBanService } from './contactBan.service';
import { ContactBan } from './contactBan.model'


@Module({
  controllers: [ContactBanController],
  providers: [ContactBanService],
  imports: [
    SequelizeModule.forFeature([ContactBan], {
      define: {
        createdAt: false,
        updatedAt: false
      }
    })
  ]
})
export class ContactBanModule {}
