import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import MapperUseCaseCreate from "./mapper/create.mapper";
import { InputCreateProductDto, OutputCreateProductDto } from "./dto/create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
        const productMapped = new MapperUseCaseCreate().convertToDomain(input);
        const product = ProductFactory.create({type: input.type,...productMapped}); 
        await this.productRepository.create(product);

        const output = await this.productRepository.find(product.id);
        
        return new MapperUseCaseCreate().convertToOutputUseCase(output);
    }

}