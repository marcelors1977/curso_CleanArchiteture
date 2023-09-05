import ProductInterface from "../../../../domain/product/entity/product.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { InputCreateProductDto, OutputCreateProductDto } from "../dto/create.product.dto";


export default class MapperUseCaseCreate implements MapperUseCaseInterface{
    convertToDomain(input: InputCreateProductDto): ProductInterface {
        return {
            id: input.id,
            name: input.name,
            price: input.price
        };
    }

    convertToOutputUseCase(input: ProductInterface): OutputCreateProductDto {
        return {
            id: input.id,
            name: input.name,
            price: input.price
        };
    }
}

