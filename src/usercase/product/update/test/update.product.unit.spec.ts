import ProductFactory from "../../../../domain/product/factory/product.factory";
import { createFakeProduct } from "../../../../infrastructure/_generator-fake-data";
import UpdateProductUseCase from "../update.product.usecase";


const MockRepository = (product: any) => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
};

describe("Unit test update product use case", () => {
    it("should update a product name", async () => {
        const productReturnFind = createFakeProduct();
        productReturnFind.changeName("Product Updated");
        const productRepository = MockRepository(productReturnFind);

        const usecaseUpdate = new UpdateProductUseCase(productRepository);


        const input = {
            id: productReturnFind.id,
            name: "Product Updated",
            price: productReturnFind.price,
        };        

        const result = await usecaseUpdate.execute({type: "a", ...input});
        expect(result).toEqual(input);
        expect(result.name).toBe("Product Updated");
    });

    it("should update a product price", async () => {
        const productReturnFind = createFakeProduct();
        productReturnFind.changePrice(10);
        const productRepository = MockRepository(productReturnFind);

        const usecaseUpdate = new UpdateProductUseCase(productRepository);

        const input = {
            id: productReturnFind.id,
            name: productReturnFind.name,
            price: 10,
        }

        const result = await usecaseUpdate.execute({type: "a", ...input});

        expect(result).toEqual(input);
        expect(result.price).toBe(10);
    });

    it("should update a product B", async () => {
        const productReturnFind = ProductFactory.create({
            id: "1",
            type: "b",
            name: "Product B Updated",
            price: 10
        });

        const productRepository = MockRepository(productReturnFind);

        const input = {
            id: "1",
            name: "Product B Updated",
            price: 10,
        };

        const usecaseUpdate = new UpdateProductUseCase(productRepository);

        const result = await usecaseUpdate.execute({type: "b", ...input});

        expect(result.name).toBe("Product B Updated");
        expect(result.price).toBe(20);
    });

 
});
