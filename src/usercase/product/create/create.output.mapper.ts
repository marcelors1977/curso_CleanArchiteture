import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { OutputCreateProductDto } from "./create.product.dto";


export default class MapperToOutputDto implements MapperUserCaseInterface<ProductInterface, OutputCreateProductDto>{
    convertTo(input: ProductInterface): OutputCreateProductDto {
        return {
            id: input.id,
            name: input.name,
            price: input.price
        };
    }
}

