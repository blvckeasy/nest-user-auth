import { ApiProperty } from "@nestjs/swagger"
import { registerDecorator, ValidationOptions, IsAlphanumeric, IsDefined, Length, IsNotEmpty, IsOptional, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, IsString, Matches, IsPhoneNumber } from 'class-validator'


export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
      registerDecorator({
          target: object.constructor,
          propertyName,
          options: validationOptions,
          constraints: [property],
          validator: MatchConstraint,
      });
  };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
      const [relatedPropertyName] = args.constraints;
      const relatedValue = (args.object as any)[relatedPropertyName];
      return value === relatedValue;
  }
}

export class CreateUserDto {
  @ApiProperty({ example: "Mark Adult", required: false, description: "fullname" })
  @IsAlphanumeric()
  @IsOptional()
  @IsString()
  @Length(4, 60, {
    message: "fullname length is between 4 and 60"
  })
  readonly fullname?: string 
  
  @ApiProperty({ example: "mark32", required: true, description: "username", uniqueItems: true })
  @IsDefined()
  @IsNotEmpty()
  @Matches(/^[a-z0-9_]+$/)
  @IsString()
  @Length(4, 40, {
    message: "username length is between 4 and 40"
  })
  readonly username: string 
  
  @ApiProperty({ example: "qwerty1234", required: true, description: "password" })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Length(4, 40, {
    message: "password length is between 4 and 40"
  })
  readonly password: string 
  
  @ApiProperty({ example: "qwerty1234", required: true, description: "repeat_password" })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Match('password', {
    message: "password and repeat_password is not equal!",
  })
  
  // @IsPostalCodeOf('password')
  @Length(4, 40, {
    message: "repeat_password length is between 4 and 40"
  })
  readonly repeat_password: string 

  @ApiProperty({ example: "+998901234567", required: false, description: "contact only (UZ)" })
  @IsString()
  @IsOptional()
  @IsPhoneNumber("UZ")
  @Matches(/^\+9989[012345789][0-9]{7}$/, {
    message: "Invalid contact!"
  })
  @Length(4, 40, {
    message: "contact length is between 12 and 30"
  })
  readonly contact?: string 

  @ApiProperty({ example: "01234", required: false, description: "Code sent to contact. First time without code if contact exists" })
  @IsString()
  @IsOptional()
  readonly code?: string
}