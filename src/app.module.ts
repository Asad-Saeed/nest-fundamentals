import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AlbumsController } from './albums.controller';
import { ProductsController } from './products.controller';
import { UsersStore } from './store/users.store';
import { Store } from './store/store';
import { Config, ENVConfig } from './store/config';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

const IS_DEV_MODE = true;
const createConnection = (dbOptions: any) => {
  return {
    type: 'postgres',
    host: dbOptions.host,
    port: dbOptions.port,
    username: dbOptions.username,
    password: dbOptions.password,
    database: dbOptions.database,
  };
};
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
    {
      provide: 'Event_Store',
      useFactory: (envConfig: ENVConfig, limit: number = 2) => {
        const eventBus$ = envConfig
          ? new ReplaySubject(limit)
          : new BehaviorSubject(null);
        console.log('envConfig', envConfig, limit);
        return eventBus$;
      },
      // inject in useFactory another dependency
      // inject: ['LIMIT'],
      inject: [ENVConfig, { token: 'LIMIT', optional: true }],
    },
    ENVConfig,
    {
      provide: 'LIMIT',
      useValue: 3,
    },
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (dbOptions: any) => {
        const connection = await createConnection(dbOptions);
        return connection;
      },
      inject: ['DB_OPTIONS'],
    },
    {
      provide: 'DB_OPTIONS',
      useValue: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'nestjs',
      },
    },
  ],
})
export class AppModule {}
