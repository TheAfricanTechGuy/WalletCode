import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'ecommerce_wallet',
      autoLoadModels: true,
      synchronize: true,
    }),
    WalletModule,
  ],
})
export class AppModule {}
