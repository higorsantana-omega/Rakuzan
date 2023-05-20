import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesSchema } from './interfaces/categories/category.schema';
import { PlayerSchema } from './interfaces/players/player.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {}),
    MongooseModule.forFeature([
      { name: 'Categories', schema: CategoriesSchema },
      { name: 'Player', schema: PlayerSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
