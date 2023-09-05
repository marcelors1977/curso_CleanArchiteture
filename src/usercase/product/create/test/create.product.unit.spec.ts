import { createFakeProduct } from "../../../../infrastructure/_generator-fake-data"
import CreateProductUseCase from "../create.product.usecase";

const product = createFakeProduct(); 

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test create product use case", () => {
    it("should create a new product A", async () => {
        const productRepository = MockRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: product.name,
            price: product.price,
        } 

        const result = await usecaseCreate.execute({type: "a",...input});
        expect(result).toStrictEqual(input);

    });

    it("should create a new product B", async () => {
        const productRepository = MockRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);

        const input = {
            id: product.id,
            name: product.name,
            price: product.price,
        } 

        product.changePrice(product.price * 2);

        const result = await usecaseCreate.execute({type: "b",...input});
        expect(result.name).toBe(input.name);
        expect(result.price).toBe(input.price * 2);

    });

    it("should throw an error when type is not supported", async () => {
        const productRepository = MockRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);

        expect(async () => {
            await usecaseCreate.execute({type: "c", id: "123", name: "Product 1", price: 10});
        }).rejects.toThrowError("Product type not supported");
    });

    it("should throw an error when id is not provided", async () => {
        const productRepository = MockRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);

        expect(async () => {
            await usecaseCreate.execute({type: "a", id: null, name: "Product 1", price: 10});
        }).rejects.toThrowError("Id is required");
    });

    it("should throw an error when price is not provided", async () => {
        const productRepository = MockRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);  

        expect(async () => {
            await usecaseCreate.execute({type: "a", id: "123", name: "Teste", price: 0});
        }).rejects.toThrowError("Price must be greater than zero");

        expect(async () => {
            await usecaseCreate.execute({type: "a", id: "123", name: "Teste", price: undefined});
        }).rejects.toThrowError("Price must be greater than zero");
    });
});