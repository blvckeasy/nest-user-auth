import { HttpException, HttpStatus, Body, Controller, Get, Post, Param, Ip, Headers, } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
// import dtos
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto';
// import models
import { CreateUserResponse, User } from './users.model'
// import services
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'


@ApiTags("Users")
@Controller('users')
export class UsersController {
  
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}
  
  #checkRequestAndToken(
    userAgents: Array<string | undefined> = [], 
    Ips: Array<string | undefined> = []
  ): boolean {
    if (
      userAgents.filter((el) => el == userAgents[0]).length == userAgents.length ||
      Ips.filter((ip) => ip == Ips[0]).length == Ips.length
    ) {
      return true
    }
    return false
  }

  @ApiOperation({summary: "User creation"})
  @ApiResponse({status: 200, type: User})
  @Post('register')
  async register(
    @Headers() headers: Headers, 
    @Body() userDto: CreateUserDto,
    @Ip() ip: string,
  ): Promise<any> {
    const user = await this.userService.createUser(userDto)
    user.headers = { 'user-agent': headers['user-agent'], ip }
    const access_token = await this.authService.signToken(user)
  
    return {
      user,
      token: access_token
    }
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Headers() headers: Headers,
    @Ip() ip: string,
  ): Promise<any>{

    const { token } = loginDto
    const { ok: tokenOK, data: user } = await this.authService.verifyToken(token)
    const validationOK = this.#checkRequestAndToken([headers["user-agent"], user.headers["user-agent"]], [ip, user.headers["ip"]])

    if (tokenOK && validationOK) {
      return await this.userService.getUser(user.id)
    }

    throw new HttpException({
      ok: false,
      message: "invalid token.",
    }, HttpStatus.FORBIDDEN)
  }

  @ApiOperation({summary: "Get all users."})
  @ApiResponse({status: 200, type: [CreateUserResponse] || CreateUserResponse})
  @Get()
  getAll(@Param('id') id: number) {
    return this.userService.getAllUsers(id)
  }
}
