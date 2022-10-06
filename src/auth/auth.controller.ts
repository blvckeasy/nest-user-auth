import { Controller, Post, Body } from '@nestjs/common';
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
    return this.authService.verifyToken(tokenDto)
  }
}
