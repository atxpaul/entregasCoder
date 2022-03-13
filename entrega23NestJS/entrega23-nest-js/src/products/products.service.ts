import { Injectable } from '@nestjs/common';
import {Product} from '../interfaces/product.interface'
import { ProductFileDao } from '../dao/product.dao';

@Injectable()
export class ProductsService {
    private readonly products : ProductFileDao 
    constructor(){
        this.products = new ProductFileDao();
    }

    async create (product:Product){
        const id:number=await this.products.save(product);
        if (id){
            const product = await this.products.getById(id);
            return product;
        } else {
            return {};
        }
    }

    async findAll(): Promise<Product[]>{
        const products:Product[]=await this.products.getAll();
        return products;
    }

    async findById(id:number): Promise<Product>{
        const product:Product= await this.products.getById(id)
        return product;
    }

    async updateById(id:number, product:Product): Promise<Product>{
        const updatedProduct:Product= await this.products.updateById(id,product);
        return updatedProduct;
    }
    async deleteById(id:number): Promise<Product>{
        const deletedProduct:Product = await this.products.getById(id); 
        await this.products.deleteById(id);
        return deletedProduct;
    }
}
