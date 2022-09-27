import { Column, DataType, Model, Table } from 'sequelize-typescript'
import Sequelize, { DataTypes } from 'sequelize'

interface ContactBanCreationAttrs {
  contact: string
  expire_date: Date
}

@Table({ tableName: "bans" })
export class ContactBan extends Model<ContactBan, ContactBanCreationAttrs> {
  
  @Column({ type: DataType.STRING, allowNull: false })
  contact: string

  @Column({ type: DataType.DATE, allowNull: true, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + (INTERVAL '5 MINUTE')") })
  expire_date: Date
}