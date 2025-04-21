import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateProductDto from './dto/create-product.dto';

const products: CreateProductDto[] = [];

@Controller('/products')
export class ProductsController {
  @Post()
  addProduct(@Body() product: CreateProductDto) {
    products.push(product);
    return { data: products, message: 'Product added successfully' };
  }
  @Get()
  getProducts() {
    return { data: products, message: 'Products fetched successfully' };
  }
  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = products.find((product) => product.id === id);
    return { data: product, message: 'Product fetched successfully' };
  }
  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: CreateProductDto) {
    const index = products.findIndex((product) => product.id === id);
    products[index] = product;
    return { data: products, message: 'Product updated successfully' };
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
    return { data: products, message: 'Product deleted successfully' };
  }
}
