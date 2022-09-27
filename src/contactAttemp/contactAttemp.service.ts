import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { ContactBanService } from '../ContactBan/contactBan.service'
import { ContactAttemp } from './contactAttemp.model'

@Injectable()
export class ContactAttempService {
  constructor(
    @InjectModel(ContactAttemp)
    private attempRepasitory: typeof ContactAttemp,
    private contactBanService: ContactBanService,
  ) {}

  async additionAttempCount(contact: string) {
    const [attemp, created] = await this.attempRepasitory.findOrCreate({
      where: { contact },
      defaults: { contact, count: 0 }
    })

    if (!created) {
      if (attemp.count ) { // == 5
        // update contact attemp count default 0
        await this.defaultAttempCount(contact)
        // ban for 5 minute
        await this.contactBanService.banContact({ contact })
        return "you are blocked"
      }
      
      // increment contact attemps
      await this.attempRepasitory.increment("count", { where: { contact } })
    }

    return attemp
  }

  async defaultAttempCount (contact: string) {
    const updated_attemp = await this.attempRepasitory.update({ count: 0 }, { where: { contact } })
    return updated_attemp
  }

}