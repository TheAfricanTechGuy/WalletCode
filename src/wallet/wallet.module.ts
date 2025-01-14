import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Wallet } from './models/wallet.model';
import { Transaction } from './models/transaction.model';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [SequelizeModule.forFeature([Wallet, Transaction])],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
