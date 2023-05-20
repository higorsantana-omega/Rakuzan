import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Category } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category) {
    this.logger.log(`category: ${JSON.stringify(category)}`);

    await this.appService.createCategory(category);
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string) {
    if (!_id) {
      return this.appService.getAllCategories();
    }

    return this.appService.getCategoryById(_id);
  }
}
