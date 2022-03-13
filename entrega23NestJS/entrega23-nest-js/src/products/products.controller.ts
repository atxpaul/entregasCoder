import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    async create(@Body() createProductDto: CreateProductDto):Promise<Product>{
        return this.productService.create(createProductDto)
    }

    @Get()
    async findAll():Promise<Product[]>{
        return this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param() params):Promise<Product>{
        return this.productService.findById(params.id);
    }

    @Put(':id')
    async updateById(@Param() params, @Body() createProductDto: CreateProductDto):Promise<Product> {
        return this.productService.updateById(params.id,createProductDto);
    }

    @Delete(':id')
    async deleteById(@Param() params):Promise<Product>{
        return this.productService.deleteById(params.id);
    }

}
