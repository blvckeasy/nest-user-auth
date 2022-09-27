import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { ContactAttemp } from './contactAttemp.model'
import { AttempController } from './contactAttemp.controller';
import { ContactAttempService } from './contactAttemp.service';
import { ContactBan } from '../ContactBan/contactBan.model'
import { ContactBanService } from '../ContactBan/contactBan.service'

@Module({
  controllers: [AttempController],
  providers: [ContactAttempService, ContactBanService],
  imports: [
    SequelizeModule.forFeature([ContactAttemp, ContactBan])
  ]
})
export class ContactAttempModule {}
