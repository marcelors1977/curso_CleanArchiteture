import ProductInterface from "../../../../domain/product/entity/product.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { OutputFindProductDto } from "../dto/find.product.dto";

export default class MapperUseCaseFind implements MapperUseCaseInterface {
    convertToDomain(data: any): any {
        return data;
    }

    convertToOutputUseCase(data: ProductInterface): OutputFindProductDto {
        const output: OutputFindProductDto = {
            id: data.id,
            name: data.name,
            price: data.price
        }

        return output;
    }
}