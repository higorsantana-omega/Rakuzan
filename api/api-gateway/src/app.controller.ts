import {
  Controller,
  Post,
  Logger,
  UsePipes,
  ValidationPipe,
  Body,
  Query,
  Get,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Observable } from 'rxjs';

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
  createCategory(@Body() createCategoryDTO: CreateCategoryDTO): void {
    this.clientMSAdmin.emit('create-category', createCategoryDTO);
  }

  @Get('/categories')
  getCategories(@Query('idCategory') _id: string): Observable<any> {
    return this.clientMSAdmin.send('get-categories', _id ? _id : '');
  }
}
