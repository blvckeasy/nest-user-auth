import { Body, Controller, Get, Post, Param, Ip, Headers, } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserResponse, User } from './users.model'
import { AuthService } from '../auth/auth.service'


@ApiTags("Users")
@Controller('users')
export class UsersController {
  
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @ApiOperation({summary: "User creation"})
  @ApiResponse({status: 200, type: User})
  @Post('register')
  async create(
    @Headers() headers: Headers, 
    @Body() userDto: CreateUserDto,
    @Ip() ip: string
  ) {
    const user = await this.userService.createUser(userDto)
    user.headers = { 'user-agent': headers['user-agent'], ip }
    const access_token = await this.authService.signToken(user)
  
    return {
      user,
      token: {
        access_token
      }
    }
  }

  @ApiOperation({summary: "Get all users."})
  @ApiResponse({status: 200, type: [CreateUserResponse] || CreateUserResponse})
  @Get()
  getAll(@Param('id') id: number) {
    return this.userService.getAllUsers(id)
  }

  @ApiResponse({status: 200, type: CreateUserResponse})
  @Post()
  registration(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }
}
