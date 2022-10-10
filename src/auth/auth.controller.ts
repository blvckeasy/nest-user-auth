import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {

  constructor (
    private authService: AuthService
  ) {}

  // this routes for testing
  @Post('signToken')
  async signToken(@Body() payloadDto) {
    return this.authService.signToken(payloadDto)
  }

  @Post('verifyToken')
  async veriftToken(@Body() tokenDto) {
    const { token } = tokenDto
    return this.authService.verifyToken(token)
  }

  @Post('check') 
  async asdf(@Headers() headers, @Body() token){
    await this.authService.tokenValidation(token, headers)
  }

}
