import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('STOCK_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}
  reserveProduct(data: any): void {
    try {
      const stockReserved = true;
      if (stockReserved) {
        this.logger.log(`Product reserved for order ${JSON.stringify(data)}`);
        this.kafkaClient.emit('product.reserved', data);
      } else {
        this.logger.log(`Product reservation failed for order ${JSON.stringify(data)}`);
        this.kafkaClient.emit('product.reservation.failed', {
          data,
          why: 'Product not available',
        });
      }
    } catch (error) {
      this.logger.log(`Product reservation failed for order ${JSON.stringify(data)}`);
      this.kafkaClient.emit('product.reservation.failed', {
        data,
        why: error.message,
      });
    }
  }

  revertStockReservation(data: any): void {
    this.logger.log(`Reverting stock for order ${JSON.stringify(data)}`);
  }
}
