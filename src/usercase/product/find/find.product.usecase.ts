import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import MapperUseCaseFind from "./mapper/find.mapper";
import { InputFindProductDto, OutputFindProductDto } from "./dto/find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const product = await this.productRepository.find(input.id);
        return new MapperUseCaseFind().convertToOutputUseCase(product);
    }
}