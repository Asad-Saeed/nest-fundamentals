import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumsController } from './albums.controller';

@Module({
  // imports: [],
  controllers: [UsersController, AlbumsController],
  // providers: [],
})
export class AppModule {}
