import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";
import ProductModel from "../repository/sequelize/product.model";

export default class ProductMapper implements MapperInfrastructureInterface {
    convertToModel(product: ProductInterface): any {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }

    convertToDomain(productModel: ProductModel): ProductInterface {
        const {
            id,
            name,
            price,
        } = productModel;

        return new Product({
            id,
            name,
            price
        });
    }
}