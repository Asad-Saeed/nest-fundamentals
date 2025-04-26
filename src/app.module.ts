import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumsController } from './albums.controller';
import { ProductsController } from './products.controller';
import { UsersStore } from './store/users.store';
import { Store } from './store/store';
import { Config } from './store/config';

@Module({
  // imports: [],
  controllers: [UsersController, AlbumsController, ProductsController],
  // Anything that is used as a dependency is called a provider
  // In object first is the token name, second is the class
  // providers: [{ provide: UsersStore, useClass: UsersStore }],
  // providers: [{ provide: 'STORE', useClass: UsersStore }],

  // Use different class
  // providers: [{ provide: UsersStore, useClass: Store }],
  // If injection token and class name are the same, you can use this shortcut
  //providers: [UsersStore],

  // Create a alias
  // providers: [UsersStore, { provide: 'STORE', useExisting: UsersStore }],
  // Value Dependency
  providers: [
    { provide: 'DATABASE_URL', useValue: 'localhost' },
    {
      provide: 'MAIL',
      useValue: ['mail.google.com', 'mail.yahoo.com', 'mail.hotmail.com'],
    },
    {
      provide: 'ENV_CONFIG',
      useValue: {
        host: 'localhost',
        port: 3000,
      },
    },
    {
      provide: Config,
      useValue: new Config('localhost', 3000),
    },
  ],
})
export class AppModule {}
