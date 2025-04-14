import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/users')
export class UsersController {
  // Request handler
  @Get('/profile')
  getProfile(@Req() req: Request) {
    console.log(req);
    return 'Hello Asad';
  }

  @Get('/profile/:id')
  getProfileById(@Param('id') id: string) {
    return `Hello Asad ${id}`;
  }
}
