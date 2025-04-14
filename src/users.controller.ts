import {
  Controller,
  Get,
  Param,
  Req,
  HttpCode,
  HttpStatus,
  Res,
  Header,
  Redirect,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/users')
export class UsersController {
  // Request handler
  @Get('/profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('x-custom-header', 'asad')
  // @Res() res: Response // this is used to send the response
  //   passthrough: true // this is used to send the response automatically  I am just modifying the response
  @Redirect('/users/account', 302)
  getProfile(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req);
    // status override
    res.status(HttpStatus.OK);
    // res.status(HttpStatus.OK).send('Hello Asad');
    const rn = Math.floor(Math.random() * 10);
    if (rn > 5) {
      return {
        message: 'Hello Asad',
        url: '/users/account',
        status: HttpStatus.MOVED_PERMANENTLY,
      };
    } else {
      return {
        message: 'Hello Asad',
        url: '/users/wallet',
        status: HttpStatus.MOVED_PERMANENTLY,
      };
    }
  }

  @Get('/profile/:id')
  getProfileById(@Param('id') id: string) {
    return `Hello Asad ${id}`;
  }

  @Get('/account')
  getAccount() {
    return `Working Account`;
  }

  @Get('/wallet')
  getWallet() {
    return `Working Wallet`;
  }
}
