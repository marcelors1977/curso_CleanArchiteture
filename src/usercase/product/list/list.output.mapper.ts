import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { OutputListProductDto } from "./list.product.dto";


export default class ListOutputMapper implements MapperUserCaseInterface<ProductInterface[], OutputListProductDto> {
    convertTo(data: ProductInterface[]): OutputListProductDto {
        return {
            products: data.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                }))
        };
    };
}