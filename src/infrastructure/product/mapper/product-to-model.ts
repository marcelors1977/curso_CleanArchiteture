import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperInterface from "../../_shared/mapper/mapper-infra-interface";

export default class MapperProductToModel implements MapperInterface<ProductInterface, any> {
    convertTo(product: ProductInterface): any {
        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}