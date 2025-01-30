import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderDto } from './dtos';
import { MessagePattern } from '@nestjs/microservices';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createOrder(@Body() orderDto: CreateOrderDto): string {
    return this.appService.createOrder(orderDto);
  }

  @MessagePattern('cancel.order')
  cancelOrder(data: any): void {
    return this.appService.cancelOrder(data);
  }
}
