import { Controller } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CompensationController {
  constructor(private readonly compensationService: CompensationService) {}

  @MessagePattern('product.reservation.failed')
  handleProductReservationFailed(data: any): void {
    return this.compensationService.handleProductReservationFailed(data);
  }

  @MessagePattern('payment.process.failed')
  handlePaymentProcessFailed(data: any): void {
    return this.compensationService.handlePaymentProcessFailed(data);
  }
}
