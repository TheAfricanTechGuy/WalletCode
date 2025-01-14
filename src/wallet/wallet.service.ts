
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Wallet } from './models/wallet.model';
import { Transaction } from './models/transaction.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet) private walletModel: typeof Wallet,
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
  ) {}

  async createWallet(userId: number): Promise<Wallet> {
    return this.walletModel.create({ userId });
  }

  async getWallet(userId: number): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({
      where: { userId },
      include: [{ model: Transaction, as: 'transactions' }],
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  async listWallets(): Promise<Wallet[]> {
    return this.walletModel.findAll({ include: [{ model: Transaction, as: 'transactions' }] });
  }

  async updateWallet(userId: number, balance: number): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    wallet.balance = balance;
    await wallet.save();
    return wallet;
  }

  async deleteWallet(userId: number): Promise<string> {
    const wallet = await this.getWallet(userId);
    await wallet.destroy();
    return `Wallet for user ${userId} deleted successfully`;
  }

  async creditWallet(userId: number, amount: number): Promise<Wallet> {
    const wallet = await this.getWallet(userId);
    wallet.balance += amount;
    await wallet.save();

    await this.transactionModel.create({
      walletId: wallet.id,
      amount,
      type: 'CREDIT',
    });

    return wallet;
  }

  async debitWallet(userId: number, amount: number): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance -= amount;
    await wallet.save();

    await this.transactionModel.create({
      walletId: wallet.id,
      amount,
      type: 'DEBIT',
    });

    return wallet;
  }

  async getWalletBalance(userId: number): Promise<number> {
    const wallet = await this.getWallet(userId);
    return wallet.balance;
  }

  async getWalletTransactions(userId: number): Promise<Transaction[]> {
    const wallet = await this.getWallet(userId);
    return wallet.transactions;
  }
}