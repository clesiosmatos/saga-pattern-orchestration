import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dtos';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('ORDERS_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  createOrder(orderDto: CreateOrderDto): string {
    orderDto.orderId = Date.now().toString();
    try {
      this.logger.log(`Creating order ${orderDto.orderId}`);
      this.kafkaClient.emit('order.created', orderDto);
      
      return `Order ${orderDto.orderId} created`;
    } catch (error) {
      this.logger.error(`Error creating order ${orderDto.orderId}`);
      throw new Error(`Error creating order ${orderDto.orderId}, ${error.message}`);
    }
  }

  cancelOrder(data: any): void {
    this.logger.log(`Order ${JSON.stringify(data)} canceled`);
  }
}
