import { createFakeProduct } from "../../../infrastructure/_generator-fake-data";
import FindOutputMapper from "./find.output.mapper";
import FindProductUseCase from "./find.product.usecase";

const product = createFakeProduct();

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test for find product use case", () => {

    it("should find a product", async () => {
       const productRepository = MockRepository();
       const usecase = new FindProductUseCase(productRepository);

       const result = await usecase.execute({id: product.id});

       expect(result).toEqual(new FindOutputMapper().convertTo(product));
    });

    it("should throw an error when product not found", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);

        expect(async () => {
            await usecase.execute({id: product.id});
        }).rejects.toThrowError("Product not found");
    });
});