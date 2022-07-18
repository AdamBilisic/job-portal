import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ContractDto } from "../types/contract.dto";
import { ContractStatus } from "../types/contract.enum";
import { Job } from "./job.model";
import { Profile } from "./profile.model";

@Table({
  tableName: 'Contract'
})
export class Contract extends Model<ContractDto> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true
  })
  id: number;

  @ForeignKey(() => Profile)
  @Column({
    allowNull: false,
    primaryKey: false,
    type: DataType.NUMBER,
  })
  clientId: number;

  @ForeignKey(() => Profile)
  @Column({
    allowNull: false,
    primaryKey: false,
    type: DataType.NUMBER,
  })
  contractorId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  terms: string;

  @Column({
    type: DataType.ENUM(...Object.values(ContractStatus)),
    allowNull: false,
  })
  status: ContractStatus

  @BelongsTo(() => Profile)
  Client: Profile;

  @BelongsTo(() => Profile)
  Contractor: Profile;

  @HasMany(() => Job)
  Job: Array<Job>
}

