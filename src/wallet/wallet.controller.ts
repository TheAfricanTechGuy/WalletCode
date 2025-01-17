import { Controller, Get, Post, Param, Body } from '@nestjs/common';
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

  @Get('active')
  async getActiveWallets() {
    return this.walletService.getActiveWallets();
  }

  @Post(':userId/credit')
  async creditWallet(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
    @Body('description') description: string,
  ) {
    return this.walletService.creditWallet(userId, amount, description);
  }

  @Post(':userId/debit')
  async debitWallet(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
    @Body('description') description: string,
  ) {
    return this.walletService.debitWallet(userId, amount, description);
  }

  @Post(':userId/pay')
  async payForOrder(
    @Param('userId') userId: number,
    @Body('amount') amount: number,
    @Body('orderId') orderId: string,
  ) {
    return this.walletService.payForOrder(userId, amount, orderId);
  }

  @Post(':userId/deactivate')
  async deactivateWallet(@Param('userId') userId: number) {
    return this.walletService.deactivateWallet(userId);
  }

  @Post(':userId/reactivate')
  async reactivateWallet(@Param('userId') userId: number) {
    return this.walletService.reactivateWallet(userId);
  }
}
