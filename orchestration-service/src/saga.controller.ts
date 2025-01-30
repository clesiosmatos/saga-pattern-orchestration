import { Controller } from '@nestjs/common';
import { SagaService } from './saga.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SagaController {
  constructor(private readonly sagaService: SagaService) {}

  @MessagePattern('order.created')
  handleOrdersCreated(data: any): void {
    return this.sagaService.handleOrdersCreated(data);
  }

  @MessagePattern('product.reserved')
  handleProductReserved(data: any): void {
    return this.sagaService.handleProductReserved(data);
  }
}
