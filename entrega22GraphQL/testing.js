import axios from 'axios';

let testsResults = [];

console.log(`Starting tests`);

console.log(`1º Test crear`);

const productoToInsert = {
  title: 'testProduct',
  price: '999',
  thumbnail: 'imageexample',
};

const productInserted = await axios.post(
  'http://localhost:8080/api/products',
  productoToInsert
);

if (
  productInserted.data.title === 'testProduct' &&
  productInserted.data.price === '999' &&
  productInserted.data.thumbnail === 'imageexample' &&
  productInserted.data.id > 0
) {
  console.log('Test OK');
  testsResults.push('Test 1 OK');
} else {
  console.log('Test Fallido');
  testsResults.push('Test 1 Fallido');
}

console.log(`2º Test listar`);

const productsInApp = await axios.get('http://localhost:8080/api/products');

if (productsInApp.data.length > 0) {
  console.log('Test OK');
  testsResults.push('Test 2 OK');
} else {
  console.log('Test Fallido');
  testsResults.push('Test 2 Fallido');
}

console.log(`3º Test listar por ID`);

const idProduct = productInserted.data.id;

const productById = await axios.get(
  'http://localhost:8080/api/products/' + idProduct
);

if (productById.data.id === idProduct) {
  console.log('Test OK');
  testsResults.push('Test 3 OK');
} else {
  console.log('Test Fallido');
  testsResults.push('Test 3 Fallido');
}

console.log(`4º Test update`);

const productoToUpdate = {
  title: 'testProduct2',
  price: '111',
  thumbnail: 'imageexample2',
};

const productoUpdated = await axios.put(
  'http://localhost:8080/api/products/' + idProduct,
  productoToUpdate
);

if (
  productoUpdated.data.title === 'testProduct2' &&
  productoUpdated.data.price === '111' &&
  productoUpdated.data.thumbnail === 'imageexample2'
) {
  console.log('Test OK');
  testsResults.push('Test 4 OK');
} else {
  console.log('Test Fallido');
  testsResults.push('Test 4 Fallido');
}

console.log(`5º Test delete`);

await axios.delete('http://localhost:8080/api/products/' + idProduct);

const productDeletedById = await axios.get(
  'http://localhost:8080/api/products/' + idProduct
);

if (productDeletedById.data.error == 'producto no encontrado') {
  console.log('Test OK');
  testsResults.push('Test 5 OK');
} else {
  console.log('Test Fallido');
  testsResults.push('Test 5 Fallido');
}
