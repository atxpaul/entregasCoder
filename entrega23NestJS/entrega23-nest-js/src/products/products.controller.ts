import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Product } from 'src/interfaces/product.interface';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    async create(@Body() createProductDto: CreateProductDto){
        this.productService.create(createProductDto)
    }

    @Get()
    async findAll():Promise<Product[]>{
        return this.productService.findAll();
    }
}
