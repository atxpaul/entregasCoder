import { FileContainer } from "../persistence/file.container";

export class ProductFileDao extends FileContainer {
    static instance: ProductFileDao;
    constructor(){
        super('.products');
        if(typeof ProductFileDao.instance ==='object'){
            return ProductFileDao.instance;
        }
        ProductFileDao.instance=this;
        return this;
    }
}