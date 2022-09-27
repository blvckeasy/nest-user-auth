import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import Sequelize from 'sequelize'


interface UserCreationAttrs {
  id: string
  fullname: string
  username: string
  password: string
  type: string
  contact: string
  coin: number
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {

  @Column({type: Sequelize.UUID, unique: true, allowNull: true,  defaultValue: Sequelize.UUIDV4, primaryKey: true })
  id: string;
  
  @ApiProperty({ example: "Mark Adom", description: "fullname" })
  @Column({type: DataType.STRING(60), allowNull: true})
  fullname: string;
  
  @ApiProperty({ example: "mark", description: "username" })
  @Column({type: DataType.STRING(40), allowNull: false, unique: true})
  username: string;

  @ApiProperty({ example: "12345678", description: "password" })
  @Column({type: DataType.STRING, allowNull: false})
  password: string;
  
  @ApiProperty({ example: "null", description: "user type. Cannot be entered :)", default: "user" })
  @Column({type: DataType.STRING(30), allowNull: true, defaultValue: "user"})
  type: string

  @ApiProperty({ example: "+998991234567", description: "contact only (UZ)"})
  @Column({type: DataType.STRING(14), allowNull: true, unique: true})
  contact: string

  @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
  coin: number
}

export class CreateUserResponse {
  @ApiProperty({ example: "db7869c5-8f09-40d0-ad01-037c19d48d55", description: "id" })
  id: string

  @ApiProperty({ example: "Mark Adom", description: "fullname" })
  fullname: string
  
  @ApiProperty({ example: "mark129", description: "username" })
  username: string
  
  @ApiProperty({ example: "type", description: "Account type. Default user" })
  type: string
  
  @ApiProperty({ example: "+998901234567", description: "contact (only for uzbekistan region)" })
  contact: string
  
  @ApiProperty({ example: "createdAt", description: "2022-09-23T13:58:43.701Z" })
  createdAt: Date
  
  @ApiProperty({ example: "updatedAt", description: "2022-09-23T13:58:43.701Z" })
  updatedAt: Date 
}