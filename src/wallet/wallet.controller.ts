import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create')
  async createWallet(@Body('userId') userId: number) {
    return this.walletService.createWallet(userId);
  }

  @Get(':userId')
  async getWallet(@Param('userId') userId: number) {
    return this.walletService.getWallet(userId);
  }

  @Get()
  async listWallets() {
    return this.walletService.listWallets();
  }

  @Put(':userId')
  async updateWallet(
    @Param('userId') userId: number,
    @Body('balance') balance: number,
  ) {
    return this.walletService.updateWallet(userId, balance);
  }

  @Delete(':userId')
  async deleteWallet(@Param('userId') userId: number) {
    return this.walletService.deleteWallet(userId);
  }

  @Post(':userId/credit')
  async creditWallet(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.walletService.creditWallet(userId, amount);
  }

  @Post(':userId/debit')
  async debitWallet(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
  ) {
    return this.walletService.debitWallet(userId, amount);
  }
}
