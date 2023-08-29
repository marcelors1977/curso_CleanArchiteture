import ProductInterface from "../../../domain/product/entity/product.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { OutputFindProductDto } from "../find/find.product.dto";


export default class UpdateOutputMapper implements MapperUserCaseInterface<ProductInterface, OutputFindProductDto> {
    convertTo(data: ProductInterface): OutputFindProductDto {
        const output: OutputFindProductDto = {
            id: data.id,
            name: data.name,
            price: data.price
        }

        return output;
    }
}