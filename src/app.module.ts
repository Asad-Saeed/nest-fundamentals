import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumsController } from './albums.controller';
import { ProductsController } from './products.controller';

@Module({
  // imports: [],
  controllers: [UsersController, AlbumsController, ProductsController],
  // providers: [],
})
export class AppModule {}
