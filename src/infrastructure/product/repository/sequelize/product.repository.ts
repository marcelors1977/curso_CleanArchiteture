import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import MapperModelToProduct from "../../mapper/model-product";
import MapperProductToModel from "../../mapper/product-to-model";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        const modelMapped = new MapperProductToModel().convertTo(entity);
        
        await  ProductModel.create(modelMapped);
    }

    async update(entity: ProductInterface): Promise<void> {
        const modelMapped = new MapperProductToModel().convertTo(entity);
        await ProductModel.update(
            {
                name: modelMapped.name,
                price: modelMapped.price
            },
            {
                where: {
                    id: modelMapped.id
            }
        });
    }

    async find(id: string): Promise<ProductInterface> {
        const productModel = await  ProductModel.findOne({
            where: {
                id: id
            }
        });

        const productMapper = new MapperModelToProduct();

        return productMapper.convertTo(productModel);
    }

    async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProductModel.findAll();

        const productMapper = new MapperModelToProduct();

        return productModels.map(productModel => {
            return productMapper.convertTo(productModel);
        });
    }
}