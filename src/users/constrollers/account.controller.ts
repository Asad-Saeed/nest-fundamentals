import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  @Get()
  getAccount() {
    return { message: 'Account' };
  }
}
