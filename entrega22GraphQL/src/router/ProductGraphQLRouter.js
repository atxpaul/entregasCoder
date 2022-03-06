import ProductGraphQLController from '../controller/ProductGraphQLController.js';

//import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const schema = buildSchema(`
    input ProductInput {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Product {
        id: ID!
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getAllProducts: [Product],
        getProductById (id: ID!): Product
    }
    type Mutation {
        createProduct (data: ProductInput): Product,
        updateProductById(id: ID!, data: ProductInput): Product,
        deleteProductById(id: ID!): Product
    }
`);

class ProductGraphQLRouter {
  constructor(graphqlHTTP) {
    this.graphqlHTTP = graphqlHTTP;
    const productController = new ProductGraphQLController();
    return this.graphqlHTTP({
      schema: schema,
      rootValue: {
        createProduct: productController.createProductController,
        getAllProducts: productController.getAllProductsController,
        getProductById: productController.getProductByIdController,
        updateProductById: productController.updateProductByIdController,
        deleteProductById: productController.deleteProductByIdController,
      },
      graphiql: true,
    });
  }
}

export default ProductGraphQLRouter;
