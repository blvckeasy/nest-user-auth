import { Controller, Post, Body } from '@nestjs/common';
import { ContactAttempService } from './contactAttemp.service'

@Controller('attemp')
export class AttempController {
  constructor (
    private attempService: ContactAttempService
  ) {}

  // this route for testing 👇🏿
  // @Post()
  // createOrfind(@Body() dto) {
  //   return this.attempService.additionAttempCount(dto.contact)
  // }

}
