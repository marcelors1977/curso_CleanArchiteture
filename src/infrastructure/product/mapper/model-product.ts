import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperInterface from "../../_shared/mapper/mapper-infra-interface";
import ProductModel from "../repository/sequelize/product.model";

export default class MapperModelToProduct implements MapperInterface<ProductModel, ProductInterface> {
    convertTo(productModel: ProductModel): ProductInterface {
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