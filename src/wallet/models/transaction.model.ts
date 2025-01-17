import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Wallet } from './wallet.model';

@Table
export class Transaction extends Model<Transaction> {
  @ForeignKey(() => Wallet)
  @Column
  walletId: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM('CREDIT', 'DEBIT', 'ORDER_PAYMENT'),
    allowNull: false,
  })
  type: 'CREDIT' | 'DEBIT' | 'ORDER_PAYMENT';

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  date: Date;

  @BelongsTo(() => Wallet)
  wallet: Wallet;
}
