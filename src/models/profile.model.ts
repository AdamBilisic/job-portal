import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProfileDto } from "../types/profile.dto";
import { ProfileType } from "../types/profile.enum";
import { Contract } from "./contract.model";

@Table({
  tableName: 'Profile'
  })
export class Profile extends Model<ProfileDto> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  profession: string;

  @Column({
    type: DataType.DECIMAL(12,2),
    allowNull: false,
  })
  balance: number;

  @Column({
    type: DataType.ENUM(...Object.values(ProfileType)),
    allowNull: false,
  })
  type: ProfileType;

  @HasMany(() => Contract, "contractorId")
  Contractor: Array<Contract>

  @HasMany(() => Contract, "clientId")
  Client: Array<Contract>
}
