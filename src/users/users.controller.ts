import { Body, Controller, Get, Post, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserResponse, User } from './users.model'


@ApiTags("Users")
@Controller('users')
export class UsersController {
  
  constructor(
    private userService: UsersService,
  ) {}

  @ApiOperation({summary: "User creation"})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({summary: "Get all users."})
  @ApiResponse({status: 200, type: [CreateUserResponse] || CreateUserResponse})
  @Get()
  getAll(@Param('id') id: number) {
    return this.userService.getAllUsers(id)
  }

  @ApiResponse({status: 200, type: CreateUserResponse})
  @Post('register')
  registration(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }
}
