import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { InputCreateProductDto } from "./create.product.dto";


export default class MapperToProductInterface implements MapperUserCaseInterface<InputCreateProductDto, ProductInterface>{
    convertTo(input: InputCreateProductDto): ProductInterface {
        return {
            id: input.id,
            name: input.name,
            price: input.price
        };
    };
}

