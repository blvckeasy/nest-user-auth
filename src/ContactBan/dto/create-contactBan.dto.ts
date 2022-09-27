import { IsDefined, IsPhoneNumber } from "class-validator"

export class CreateContactBanDto {

  @IsDefined()
  @IsPhoneNumber("UZ")
  readonly contact: string

}