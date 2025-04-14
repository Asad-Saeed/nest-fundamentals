import { Controller, Get, Param } from '@nestjs/common';

@Controller('/albums')
export class AlbumsController {
  // Request handler
  @Get('/')
  getAlbums() {
    return 'Hello Asad';
  }

  @Get('/:id')
  getAlbumById(@Param('id') id: string) {
    return `Hello Asad ${id}`;
  }
}
