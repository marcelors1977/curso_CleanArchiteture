import { createFakeProduct } from "../../../../infrastructure/_generator-fake-data";
import ListProductUseCase from "../list.product.usecase";

const product1 = createFakeProduct();
const product2 = createFakeProduct();

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2]))
    };
};

describe("Unit test for listing product use case", () => {

    it("should list all products", async () => {
        const productRepository = MockRepository();
        const listUseCase = new ListProductUseCase(productRepository);

        const output = await listUseCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);    
    });
})