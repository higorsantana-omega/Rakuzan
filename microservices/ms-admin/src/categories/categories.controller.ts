import { Controller, Logger } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Category } from './interfaces/category.interface';

const ackErrors = ['E1100'];

@Controller()
export class CategoriesController {
  private logger = new Logger(CategoriesController.name);

  constructor(private readonly categoriesService: CategoriesService) {}

  @EventPattern('create-category')
  async createCategory(
    @Payload() category: Category,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`category: ${JSON.stringify(category)}`);

    try {
      await this.categoriesService.createCategory(category);

      await channel.ack(originalMessage);
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);

      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @EventPattern('update-category')
  async updateCategory(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    this.logger.log(`data: ${JSON.stringify(data)}`);

    try {
      const category: Category = data.category;

      await this.categoriesService.updateCategory(data.id, category);

      await channel.ack(originalMessage);
    } catch (error) {
      const errors = ackErrors.filter((ack) => error.message.includes(ack));

      if (errors) {
        await channel.ack(originalMessage);
      }
    }
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();

    try {
      if (!_id) {
        return this.categoriesService.getAllCategories();
      }

      return this.categoriesService.getCategoryById(_id);
    } finally {
      await channel.ack(originalMessage);
    }
  }
}
