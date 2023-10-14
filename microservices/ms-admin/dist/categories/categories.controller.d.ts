import { CategoriesService } from './categories.service';
import { RmqContext } from '@nestjs/microservices';
import { Category } from './interfaces/category.interface';
export declare class CategoriesController {
    private readonly categoriesService;
    private logger;
    constructor(categoriesService: CategoriesService);
    createCategory(category: Category, context: RmqContext): Promise<void>;
    updateCategory(data: any, context: RmqContext): Promise<void>;
    getCategories(_id: string, context: RmqContext): Promise<Category | Category[]>;
}
