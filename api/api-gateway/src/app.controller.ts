import {
  Controller,
  Post,
  Logger,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('/api')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientMSAdmin: ClientProxy;

  constructor() {
    this.clientMSAdmin = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672/ranking'],
        queue: 'ms-admin',
      },
    });
  }

  @Post('/categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.clientMSAdmin.emit('create-category', createCategoryDTO);
  }
}
