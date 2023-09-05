import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import MapperUseCaseList from "./mapper/list.mapper";
import { InputListProductDto, OutputListProductDto } from "./dto/list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();

        return new MapperUseCaseList().convertToOutputUseCase(products);
    }
}