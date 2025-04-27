import { Module, Global } from '@nestjs/common';
import { UsersController } from './constrollers/users.controller';
import { UsersService } from './services/users.service';
import { AccountController } from './constrollers/account.controller';

// Global Module means don't need to import this module in other modules
// @Global()
@Module({
  imports: [],
  controllers: [UsersController, AccountController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
