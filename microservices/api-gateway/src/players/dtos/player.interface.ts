import { Document } from 'mongoose';
import { Category } from '../../categories/dtos/category.interface';

export default interface Player extends Document {
  readonly phone: string;
  readonly email: string;
  category: Category;
  name: string;
  ranking: string;
  position: number;
  photo: string;
}
