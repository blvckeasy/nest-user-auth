import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { ConfigService } from '@nestjs/config'

// import services
import { ContactAttempService } from '../contactAttemp/contactAttemp.service'
import { AuthService } from '../auth/auth.service'
import { ContactBanService } from '../ContactBan/contactBan.service'


@Injectable()
export class UsersService {

  constructor (
    @InjectModel(User)
    private userRepository: typeof User,
    private authService: AuthService,
    private attempService: ContactAttempService,
    private contactBanService: ContactBanService,
    private configService: ConfigService,
  ) {}

  async createUser(userDto: CreateUserDto) {
    const { username, password, fullname, contact, code } = userDto

    const find_user = await this.userRepository.findOne({
      where: { username: username.toLowerCase() }
    })

    if (find_user) throw new HttpException(`${username} user already exists.`, HttpStatus.FOUND)
    if (contact) {
      const find_contact = await this.userRepository.findOne({
        where: { contact },
      })

      const find_contact_ban = await this.contactBanService.getBanContact(contact)

      if (find_contact) throw new HttpException(`${contact} contact already exists.`, HttpStatus.FOUND)
      if (find_contact_ban) throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        message: `"${contact}" was saved until "${find_contact_ban.expire_date}"!`,
        ban_expire_date: find_contact_ban.expire_date
      }, HttpStatus.FORBIDDEN)

      if (!code) {
        // send sms to contact (OTP)
        await this.authService.sendSMSCode(contact)

        return {
          status: 200,
          message: `sms sended your "${contact}" contact number please input it.`
        }
      } else if (code) {
        // increase the number of contact attempts
        await this.attempService.additionAttempCount(contact)

        // Check the code sent to the contact
        await this.authService.verifySMSCode(contact, code)
      }
      // After everything is completed successfully, return the number of attempts to the default value
      await this.attempService.defaultAttempCount(contact)
    }
    // create user
    const user = (await Object(await this.userRepository.create({
      fullname, username, password, contact
    }))).dataValues
    
    delete user.password
    return user
  }

  

  // async login(token: string) {
  //   const { data: user } = await this.authService.verifyToken(token)
  // }

  async login(username: string) {
    const user = await this.userRepository.findOne({ where: { username } })
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

  async getUser(user_id: string) {
    const user = await this.userRepository.findOne({
      where: { id: user_id }
    })
    return user || {}
  }

}