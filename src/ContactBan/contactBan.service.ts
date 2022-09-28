import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { Cron, CronExpression } from '@nestjs/schedule'
// import dto
import { CreateContactBanDto } from './dto/create-contactBan.dto'
// import models
import { ContactBan } from './contactBan.model'
import { Op } from 'sequelize'


@Injectable()
export class ContactBanService {
  constructor(
    @InjectModel(ContactBan)
    private banRepository: typeof ContactBan
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  // the function of deleting those who have expired
  deleteContactBanEveryMinute() {
    this.banRepository.destroy({
      where: { 
        expire_date: { [Op.lte]: new Date() }
      }
    })
  }

  async getAllBanContacts() {
    const contactsBanInfo = await this.banRepository.findAll()
    return contactsBanInfo
  }

  async getBanContact(contact: string) {
    const contactBanInfo = await this.banRepository.findOne({ where: { contact } })
    return contactBanInfo
  }

  async deleteContactBan(contact: string) {
    await this.banRepository.destroy({
      where: { 
        contact,  
        expire_date: {
          [Op.lte]: new Date()
        }
      },
    })
    return {
      status: 200,
      ok: true,
    } 
  }

  async deleteExpiredContactsBan() {
    await this.banRepository.destroy({
      where: {
        expire_date: {
          [Op.lte]: new Date()
        }
      }
    })
    return {
      status: 200,
      ok: true,
    }
  }

  async banContact(dto: CreateContactBanDto) {
    const { contact } = dto
    const [ban, created] = await this.banRepository.findOrCreate({ where: { contact } })
    if (!created) {
      ban.expire_date =  new Date(Date.now() + (5 * 60 * 1000))
    }
  }

}
