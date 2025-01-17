import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Transaction } from './transaction.model';

@Table
export class Wallet extends Model<Wallet> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  userId: number;

  @Column({
    type: DataType.FLOAT,
    defaultValue: 0,
  })
  balance: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true, // Wallet is active by default
  })
  isActive: boolean;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
