import { CreateCategoryDTO } from './dtos/create-category.dto';
import { Observable } from 'rxjs';
import { UpdateCategoryDTO } from './dtos/update-category.dto';
import { ClientProxyBasket } from 'src/proxy/client-proxy';
export declare class CategoriesController {
    private clientProxyBasket;
    private logger;
    private clientMSAdmin;
    constructor(clientProxyBasket: ClientProxyBasket);
    createCategory(createCategoryDTO: CreateCategoryDTO): void;
    getCategories(_id: string): Observable<any>;
    updateCategory(updateCategoryDTO: UpdateCategoryDTO, id: string): void;
}
