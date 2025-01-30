import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CompensationService {

  constructor(
    @Inject('ORCHESTRATION_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  handleProductReservationFailed(data: any): void {
    this.kafkaClient.emit('cancel.order', data);
  }

  handlePaymentProcessFailed(data: any): void {
    this.kafkaClient.emit('cancel.order', data);
    this.kafkaClient.emit('revert.stock.reservation', data);
  }
}
