// import {
//   Controller,
//   Get,
//   Param,
//   Req,
//   HttpCode,
//   HttpStatus,
//   Res,
//   Header,
//   Redirect,
//   Query,
//   Headers,
//   Post,
//   Body,
// } from '@nestjs/common';
// import { Request, Response } from 'express';

// interface VideoDTO {
//   id: string;
//   name: string;
// }

// @Controller('/users')
// export class UsersController {
//   // Request handler
//   @Get('/profile')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @Header('x-custom-header', 'asad')
//   // @Res() res: Response // this is used to send the response
//   //   passthrough: true // this is used to send the response automatically  I am just modifying the response
//   @Redirect('/users/account', 302)
//   getProfile(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
//     console.log(req);
//     // status override
//     res.status(HttpStatus.OK);
//     // res.status(HttpStatus.OK).send('Hello Asad');
//     const rn = Math.floor(Math.random() * 10);
//     if (rn > 5) {
//       return {
//         message: 'Hello Asad',
//         url: '/users/account',
//         status: HttpStatus.MOVED_PERMANENTLY,
//       };
//     } else {
//       return {
//         message: 'Hello Asad',
//         url: '/users/wallet',
//         status: HttpStatus.MOVED_PERMANENTLY,
//       };
//     }
//   }

//   @Get('/profile/:id')
//   getProfileById(@Param() params: string) {
//     return `Hello Asad ${params}`;
//   }

//   @Get('/account')
//   getAccount() {
//     return `Working Account`;
//   }

//   @Get('/wallet')
//   getWallet() {
//     return `Working Wallet`;
//   }

//   // Route parameters
//   @Get('/videos/:id')
//   getVideos(@Param('id') id: string) {
//     return `Working Videos ${id}`;
//   }

//   @Get('/videos/:id/:name')
//   getVideosById(@Param() params: VideoDTO) {
//     return `Working Videos ${params.id} ${params.name}`;
//   }

//   // Query parameters
//   @Get('/videos')
//   getVideosBySearch(@Query() query: Record<string, any>) {
//     console.log(query);
//     return `Working Videos ${JSON.stringify(query)}`;
//   }
//   @Get('/videos')
//   getVideosByName(@Query('name') name: string) {
//     console.log(name);
//     return `Working Videos ${name}`;
//   }

//   // Request headers
//   @Get('/videos')
//   getVideosByHeader(@Headers() headers: Record<string, any>) {
//     console.log(headers);
//     return `Working Videos ${JSON.stringify(headers)}`;
//   }

//   // Request body
//   @Post('/video')
//   getVideosByBody(@Body() body: VideoDTO) {
//     console.log(body);
//     return `Working Videos ${JSON.stringify(body)}`;
//   }
// }
import { Controller, Inject, Optional } from '@nestjs/common';
import { UsersStore } from './store/users.store';

@Controller('/users')
export class UsersController {
  // Provider injection / Lazy injection ==Inject only when needed
  constructor(private store: UsersStore) {
    console.log(this.store);
  }
  // If you want to inject a service into a controller you can use the @Inject() decorator
  // constructor(@Inject(UsersStore) private store: UsersStore) {
  //   console.log(this.store);
  // }
  // it is used if injection token and class name are not the same
  // constructor(@Inject('STORE') private store: UsersStore) {
  //   console.log(this.store);
  // }
  // Optional injection
  // constructor(@Optional() private store: UsersStore) {
  //   console.log(this.store);
  // }
}
