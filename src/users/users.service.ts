import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth/auth.service'


@Injectable()
export class UsersService {

  constructor (
    @InjectModel(User)
    private userRepository: typeof User,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  async createUser(userDto: CreateUserDto) {
    const { username, password, repeat_password, fullname, contact, code } = userDto

    const find_user = await this.userRepository.findOne({
      where: { username }
    })

    if (find_user) throw new HttpException(`${username} user already exists.`, HttpStatus.FOUND)
    if (contact) {
      const find_contact = await this.userRepository.findOne({
        where: { contact },
      })

      if (find_contact) throw new HttpException(`${contact} contact already exists.`, HttpStatus.FOUND)
      if (!code) {
        // send sms to contact
        await this.authService.sendSMSCode(contact)
        
        return {
          status: 200,
          message: `sms sended your "${contact}" contact number please input it.`
        }
      } else if (code) {
        await this.authService.verifySMSCode(contact, code)
      }
    }

    const user = await this.userRepository.create({
      fullname, username, password, contact
    })

    delete user["password"]
    return user
  }

  async getAllUsers(user_id: number) {
    if (user_id) {
      const user = await this.userRepository.findOne({
        where: {
          id: user_id
        },
        attributes: { exclude: ['password'] }
      })
      return user || {}
    }

    const users = await this.userRepository.findAll()
    return users || []
  }

}


// INSERT INTO "users" ("id","fullname","username","password","type","contact","coin","createdAt","updatedAt") 
// VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)