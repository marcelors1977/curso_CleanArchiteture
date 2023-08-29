import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import MapperToProductInterface from "./update.input.mapper";
import UpdateOutputMapper from "./update.output.mapper";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {   
        const inputToProductInterface = new MapperToProductInterface().convertTo(input);
        
        const productToUpdate = ProductFactory.create({type: input.type, ...inputToProductInterface});

        await this.productRepository.update(productToUpdate);

        const product = await this.productRepository.find(input.id);

        return new UpdateOutputMapper().convertTo(product);
    }
}