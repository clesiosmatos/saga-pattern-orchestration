import { Module } from '@nestjs/common';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CompensationController } from './compensation.controller';
import { CompensationService } from './compensation.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORCHESTRATION_KAFKA',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'orchestration-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [SagaController, CompensationController],
  providers: [SagaService, CompensationService],
})
export class AppModule {}
