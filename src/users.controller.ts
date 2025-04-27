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

//////////////// Dependency Injection ////////////////

// import { Controller, Inject, Optional } from '@nestjs/common';
// import { UsersStore } from './store/users.store';
// import { Config } from './store/config';
// import { Subject } from 'rxjs';

// @Controller('/users')
// export class UsersController {
//   // Provider injection / Lazy injection ==Inject only when needed
//   // constructor(private store: UsersStore) {
//   //   console.log(this.store);
//   // }
//   // If you want to inject a service into a controller you can use the @Inject() decorator
//   // constructor(@Inject(UsersStore) private store: UsersStore) {
//   //   console.log(this.store);
//   // }
//   // it is used if injection token and class name are not the same
//   // constructor(@Inject('STORE') private store: UsersStore) {
//   //   console.log(this.store);
//   // }
//   // Optional injection
//   // constructor(@Optional() private store: UsersStore) {
//   //   console.log(this.store);
//   // }

//   // Value Dependency injection
//   constructor(
//     @Inject('DATABASE_URL') private dbUrl: string,
//     @Inject('MAIL') private mail: string[],
//     @Inject('ENV_CONFIG') private evvConfig: { host: string; port: number },
//     private config: Config,
//     @Inject('Event_Store') private eventBus$: Subject<any>,
//     @Inject('DATABASE_CONNECTION') private connection: any,
//   ) {
//     console.log('Database URL', this.dbUrl);
//     console.log('Mail', this.mail);
//     console.log('ENV Config', this.evvConfig);
//     console.log('Config', this.config);
//     console.log('Event Bus', this.eventBus$);
//     console.log('DB Connection', this.connection);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-users.dto';
import { User, UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.addUser(createUserDto);
  }

  @Get()
  findAllUsers(): CreateUserDTO[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDTO) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
