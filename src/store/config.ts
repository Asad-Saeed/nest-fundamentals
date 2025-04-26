import { Injectable } from '@nestjs/common';

@Injectable()
export class Config {
  host: string;
  port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }
}

@Injectable()
export class ENVConfig {
  envType: 'DEV' | 'PROD' | 'STAGING';

  constructor() {
    this.envType = 'DEV';
  }
}
