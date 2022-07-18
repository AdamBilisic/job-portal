import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { JobDto } from "../types/job.dto";
import { Contract } from "./contract.model";

@Table({
  tableName: 'Job'
})
export class Job extends Model<JobDto> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @ForeignKey(() => Contract)
  @Column({
    allowNull: false,
    primaryKey: false,
    type: DataType.INTEGER,
  })
  contractId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DECIMAL(12,2),
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  paid: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  paymentDate: Date;

  @BelongsTo(() => Contract)
  Contract: Contract;
}
