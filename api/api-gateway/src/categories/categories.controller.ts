import {
  Controller,
  Post,
  Logger,
  UsePipes,
  ValidationPipe,
  Body,
  Query,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Observable } from 'rxjs';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { ClientProxyBasket } from 'src/proxy/client-proxy';

@Controller('/api')
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);
  private clientMSAdmin = this.clientProxyBasket.getClientProxyAdmin();

  constructor(private clientProxyBasket: ClientProxyBasket) {}

  @Post('/categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDTO: CreateCategoryDTO): void {
    this.clientMSAdmin.emit('create-category', createCategoryDTO);
  }

  @Get('/categories')
  getCategories(@Query('idCategory') _id: string): Observable<any> {
    return this.clientMSAdmin.send('get-categories', _id ? _id : '');
  }

  @Put('/categories/:id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('id') id: string,
  ) {
    this.clientMSAdmin.emit('update-category', {
      id,
      category: updateCategoryDTO,
    });
  }
}
