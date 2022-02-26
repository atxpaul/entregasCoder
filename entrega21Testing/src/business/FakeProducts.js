import faker from 'faker';

class FakeProducts {
  constructor() {}
  getFakeProducts = async () => {
    faker.locale = 'es';
    const { commerce, image } = faker;
    let productos = [];
    for (let i = 0; i < 5; i++) {
      let obj = {};
      obj.title = commerce.productName();
      obj.price = commerce.price();
      obj.thumbnail = image.imageUrl();
      productos.push(obj);
    }
    return productos;
  };
}

export default FakeProducts;
