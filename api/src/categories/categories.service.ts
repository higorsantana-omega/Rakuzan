import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { Category } from './interfaces/categories.interface';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categories')
    private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDTO: CreateCategoryDTO) {
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
  }

  async update(
    id: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    const category = await this.categoryModel.findOne({ _id: id }).exec();
    if (!category) {
      throw new BadRequestException(`category with id ${id} not exists.`);
    }

    await this.categoryModel
      .findOneAndUpdate({ _id: id }, { $set: updateCategoryDTO })
      .exec();
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

  async getCategoryByPlayer(playerId: string): Promise<Category> {
    const category = await this.categoryModel
      .find({ $where: 'players' })
      .in(playerId)
      .exec();

    return category;
  }

  async assignPlayerCategory(params: string[]): Promise<void> {
    const category = params['category'];
    const playerId = params['playerId'];

    const [categoryExists] = await Promise.all([
      this.categoryModel.findOne({ category }).exec(),
      this.playersService.getPlayerById(playerId),
    ]);

    if (!categoryExists)
      throw new NotFoundException(`category ${category} not found.`);

    const categoryAlreadyHasPlayer = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId)
      .exec();

    if (categoryAlreadyHasPlayer.length > 0)
      throw new BadRequestException(
        `Player ${playerId} already registered in the category`,
      );

    categoryExists.players.push(playerId);

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryExists })
      .exec();
  }
}
