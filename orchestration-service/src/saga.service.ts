import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class SagaService {

  constructor(
    @Inject('ORCHESTRATION_KAFKA') private readonly kafkaClient: ClientKafka,
  ) {}

  handleOrdersCreated(data: any): void {
    this.kafkaClient.emit('reserve.product', data);
  }

  handleProductReserved(data: any): void {
    this.kafkaClient.emit('process.payment', data);
  }
}
