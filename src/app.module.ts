import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { UsersModule } from './users/users.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [StoreModule, UsersModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
