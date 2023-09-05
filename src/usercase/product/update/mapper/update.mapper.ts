import ProductInterface from "../../../../domain/product/entity/product.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { OutputFindProductDto } from "../../find/dto/find.product.dto";
import { InputUpdateProductDto } from "../dto/update.product.dto";

export default class MapperUseCaseUpdate implements MapperUseCaseInterface {
    convertToOutputUseCase(data: ProductInterface): OutputFindProductDto {
        const output: OutputFindProductDto = {
            id: data.id,
            name: data.name,
            price: data.price
        }

        return output;
    }

    convertToDomain(input: InputUpdateProductDto): ProductInterface {
        return {
            id: input.id,
            name: input.name,
            price: input.price,
        };
    }
}