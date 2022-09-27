import { Column, Model, Table } from 'sequelize-typescript'
import Sequelize from 'sequelize'
import { IsPhoneNumber } from 'class-validator'

interface ContactAttempCreationAttrs {
  contact: string
  count: number
}

@Table({ tableName: "otp_attemps" })
export class ContactAttemp extends Model<ContactAttemp, ContactAttempCreationAttrs> {

  @IsPhoneNumber('UZ')
  @Column({ type: Sequelize.STRING, allowNull: false, primaryKey: true })
  contact: string

  @Column({ type: Sequelize.SMALLINT, defaultValue: 1 })
  count: number

}