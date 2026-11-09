import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [ClientsModule.register([{
    name: 'INVENTORY_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'inventory',
      protoPath: join(process.cwd(), 'libs/proto/src/inventory.proto'),
      url: 'localhost:50051',
    },
  }])],
  controllers: [AppController],
})
export class AppModule {}
