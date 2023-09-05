import ProductInterface from "../../../../domain/product/entity/product.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { OutputListProductDto } from "../dto/list.product.dto";

export default class MapperUseCaseList implements MapperUseCaseInterface {
    convertToDomain(data: any): any {
        return data;
    }

    convertToOutputUseCase(data: ProductInterface[]): OutputListProductDto {
        return {
            products: data.map(product => ({
                    id: product.id,
                    name: product.name,
                    price: product.price
                }))
        };
    }
}