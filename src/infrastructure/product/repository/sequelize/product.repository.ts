import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductMapper from "../../mapper/product.mapper";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: ProductInterface): Promise<void> {
        const modelMapped = new ProductMapper().convertToModel(entity);
        
        await  ProductModel.create(modelMapped);
    }

    async update(entity: ProductInterface): Promise<void> {
        const modelMapped = new ProductMapper().convertToModel(entity);
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
        let productModel;
        try {
            productModel = await  ProductModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            });
            
        } catch (error) {
            throw new Error("Product not found");            
        }

        const productMapper = new ProductMapper();

        return productMapper.convertToDomain(productModel);
    }

    async findAll(): Promise<ProductInterface[]> {
        const productModels = await ProductModel.findAll();

        const productMapper = new ProductMapper();

        return productModels.map(productModel => {
            return productMapper.convertToDomain(productModel);
        });
    }
}