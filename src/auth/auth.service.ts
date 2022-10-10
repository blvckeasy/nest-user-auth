import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Headers } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions} from '@nestjs/jwt'
import axios from 'axios';


@Injectable()
export class AuthService {
  
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

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

    if ([-10001].includes(res.data.error?.code)) throw new InternalServerErrorException();
    if ([-10004].includes(res.data.error?.code)) throw new HttpException(res.data.error.message, HttpStatus.NOT_ACCEPTABLE)

    return res;
  }

  async signToken(payloadDto: object) {
    return {
      accessToken: this.jwtService.sign(payloadDto)
    }
  }

  async verifyToken(token: string) {
    try {
      return {
        ok: true,
        data: await this.jwtService.verify(token) 
      }
    } catch (error) {
      console.error(error)

      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        ok: false,
        error: error.message,
        data: {}
      }, HttpStatus.FORBIDDEN)
    }
  }

  /**
    * pass token validations
  */
  async tokenValidation(token: string, headers: Headers) {
    const tokenInfo = await this.verifyToken(token)
    console.log('1');
    if (tokenInfo.data?.headers["user-agent"] !== headers["user-agent"]) {
      throw new HttpException({
        statusCode: HttpStatus.FORBIDDEN,
        ok: false,
        message: "invalid token"
      }, HttpStatus.FORBIDDEN)
    }
    return {
      statusCode: 201,
      ok: true,
    }
  }
}