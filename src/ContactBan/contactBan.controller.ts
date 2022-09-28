import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactBanDto } from './dto/create-contactBan.dto'
import { ContactBanService } from './contactBan.service'

@Controller('ban')
export class ContactBanController {
  
  constructor(
    private banService: ContactBanService
  ) {}

  @Post()
  createOrFind(@Body() dto: CreateContactBanDto) {
    return this.banService.banContact(dto)
  }

}