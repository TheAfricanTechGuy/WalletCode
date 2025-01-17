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
      include: [Transaction],
    });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return wallet;
  }

  
  async getActiveWallets(): Promise<Wallet[]> {
    return this.walletModel.findAll({
      where: { isActive: true },
      include: [Transaction],
    });
  }

  
  async creditWallet(userId: number, amount: number, description: string): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (!wallet.isActive) {
      throw new BadRequestException('Wallet is inactive');
    }

    wallet.balance += amount;
    await wallet.save();

    await this.transactionModel.create({
      walletId: wallet.id,
      amount,
      type: 'CREDIT',
      description,
    });

    return wallet;
  }

  
  async debitWallet(userId: number, amount: number, description: string): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (!wallet.isActive) {
      throw new BadRequestException('Wallet is inactive');
    }

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    wallet.balance -= amount;
    await wallet.save();

    await this.transactionModel.create({
      walletId: wallet.id,
      amount,
      type: 'DEBIT',
      description,
    });

    return wallet;
  }

  
  async payForOrder(userId: number, amount: number, orderId: string): Promise<Wallet> {
    const wallet = await this.getWallet(userId);

    if (!wallet.isActive) {
      throw new BadRequestException('Wallet is inactive');
    }

    if (wallet.balance < amount) {
      throw new BadRequestException('Insufficient balance to pay for the order');
    }

    wallet.balance -= amount;
    await wallet.save();

    await this.transactionModel.create({
      walletId: wallet.id,
      amount,
      type: 'ORDER_PAYMENT',
      description: `Payment for order #${orderId}`,
    });

    return wallet;
  }

  
  async deactivateWallet(userId: number): Promise<string> {
    const wallet = await this.walletModel.findOne({ where: { userId } });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    wallet.isActive = false;
    await wallet.save();

    return `Wallet for user ${userId} has been deactivated.`;
  }

  
  async reactivateWallet(userId: number): Promise<string> {
    const wallet = await this.walletModel.findOne({ where: { userId } });

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    wallet.isActive = true;
    await wallet.save();

    return `Wallet for user ${userId} has been reactivated.`;
  }
}
