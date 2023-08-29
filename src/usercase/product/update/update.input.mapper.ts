import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { InputUpdateProductDto } from "./update.product.dto";


export default class MapperToProductInterface implements MapperUserCaseInterface<InputUpdateProductDto, ProductInterface>{
    convertTo(input: InputUpdateProductDto): ProductInterface {
        return {
            id: input.id,
            name: input.name,
            price: input.price,
        };
    };
}

