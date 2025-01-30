import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('reserve.product')
  reserveProduct(data: any): void {
    return this.appService.reserveProduct(data);
  }

  @MessagePattern('revert.stock.reservation')
  revertStockReservation(data: any): void {
    return this.appService.revertStockReservation(data);
  }
}
