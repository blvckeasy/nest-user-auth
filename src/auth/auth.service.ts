import { ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  
  constructor(private configService: ConfigService) {}

  async sendSMSCode(contact: string): Promise<any> {
    if (contact.length < 9) {
      return {
        status: 403,
        error: 'Enter a valid contact!',
      };
    }
    if (contact.length > 9) {
      contact = contact.substring(contact.length - 9, contact.length);
    }

    const fetchConfig = this.configService
      .get('smsGateway')
      .createFetchConfig('sendCode', contact);
    const res = await axios(fetchConfig);

    if ([-10001].includes(res.data.error?.code)) throw new InternalServerErrorException();
    if ([-10004].includes(res.data.error?.code)) throw new HttpException(res.data.error.message, HttpStatus.NOT_ACCEPTABLE)
    
    return res;
  }

  async verifySMSCode(contact: string, code: string): Promise<any> {
    if (contact.length < 9) {
      return {
        status: 403,
        error: 'Enter a valid contact!',
      };
    }
    if (contact.length > 9) {
      contact = contact.substring(contact.length - 9, contact.length);
    }
    const fetchConfig = this.configService
      .get('smsGateway')
      .createFetchConfig('verification', contact, code);

    const res = await axios(fetchConfig)

    console.log('res data: ', res.data)

    if ([-10001].includes(res.data.error?.code)) throw new InternalServerErrorException();
    if ([-10004].includes(res.data.error?.code)) throw new HttpException(res.data.error.message, HttpStatus.NOT_ACCEPTABLE)

    return res;
  }
}
