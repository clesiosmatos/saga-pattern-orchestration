import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @Inject('PAYMENT_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}
  
  processPayment(data: any): void {
    try {
      const paymentRealized = false;
      if (paymentRealized) {
        this.logger.log(`Payment processed for order ${JSON.stringify(data)}`);
        this.kafkaClient.emit('payment.processed', data);
      } else {
        this.logger.error(`Payment process failed for order ${JSON.stringify(data)}`);
        this.kafkaClient.emit('payment.process.failed', {
          data,
          why: 'Payment failed',
        });
      }
    } catch (error) {
      this.logger.error(`Payment process failed for order ${JSON.stringify(data)}`);
      this.kafkaClient.emit('payment.process.failed', {
        data,
        why: error.message,
      });
    }
  }
}
