import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name);

  constructor(
    @InjectModel('Categories')
    private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(createCategoryDTO: Category) {
    try {
      const category = await this.categoryModel
        .findOne({ category: createCategoryDTO.category })
        .exec();

      if (category) {
        throw new BadRequestException(
          `Category ${createCategoryDTO.category} already exists.`,
        );
      }

      const categoryCreated = new this.categoryModel(createCategoryDTO);
      return categoryCreated.save();
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel
      .find()
      .populate('players')
      .exec();
    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    if (!category)
      throw new NotFoundException(`category with id ${id} not found.`);

    return category;
  }
}
