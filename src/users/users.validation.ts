// import Joi from 'joi'

// import { HttpException, HttpStatus } from '@nestjs/common'
// import { CreateUserDto } from 'src/users/dto/create-user.dto'

// console.log('this is joi: ',Joi)

// export default async function UserCreateValidation(userDto: CreateUserDto) {
//   const schema = Joi.object({
//     fullname: Joi.string()
//       .alphanum()
//       .min(3)
//       .max(60)
//       .error(new HttpException('fullname is invalid', HttpStatus.NO_CONTENT))
//       .optional(),
  
//     username: Joi.string()
//       .alphanum()
//       .min(5)
//       .max(35)
//       .error(new HttpException('fullname is invalid', HttpStatus.NO_CONTENT))
//       .required(),
    
//     password: Joi.string()
//       .min(8)
//       .max(25)
//       .error(new HttpException('password is invalid', HttpStatus.NO_CONTENT))
//       .required(),
    
//     repeat_password: Joi.ref('password'),
  
//     contact: Joi.string()
//       .pattern(new RegExp('/^998(9[012345789]|6[125679]|7[01234569])[0-9]{7}$/'))
//       .error(new HttpException('contact is invalid', HttpStatus.NO_CONTENT))
//       .optional()
//   })

//   return await schema.validateAsync(userDto)
// }