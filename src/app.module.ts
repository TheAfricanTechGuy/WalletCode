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
      database: 'wallet_system',
      autoLoadModels: true,
      synchronize: true,
    }),
    WalletModule,
  ],
})
export class AppModule {}
