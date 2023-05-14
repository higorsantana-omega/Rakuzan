import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrUpdateCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.categoriesService.create(createCategoryDTO);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDTO: UpdateCategoryDTO,
    @Param('id') id: string,
  ) {
    await this.categoriesService.update(id, updateCategoryDTO);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoriesService.getAllCategories();
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post('/:category/players/:playerId')
  async assignPlayerCategory(@Param() params: string[]): Promise<void> {
    return this.categoriesService.assignPlayerCategory(params);
  }

  /*
  @Delete('/:id')
  async deleteCategory(
    @Param('id', CategorysValidationParamsPipe) id: string,
  ): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  } */
}
