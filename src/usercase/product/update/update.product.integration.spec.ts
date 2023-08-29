import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test integration in update product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product name", async () => {
        const productRepository = new ProductRepository();
        const useCaseUpdate = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create({
            id: "1",
            type: "a",
            name: "Product",
            price: 10
        });

        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product Updated",
            price: product.price * 3,
        };

        const result = await useCaseUpdate.execute({type: "a", ...input});
        expect(result).toEqual(input);
        expect(result.name).toBe("Product Updated");
        expect(result.price).toBe(30);
    });

    it("should update a product B", async () => {
        const productRepository = new ProductRepository();
        const usecaseUpdate = new UpdateProductUseCase(productRepository);

        const product = ProductFactory.create({
            id: "1",
            type: "b",
            name: "Product B",
            price: 10
        });

        await productRepository.create(product);

        const input = {
            id: product.id,
            name: "Product B Updated",
            price: 20
        };

        const result = await usecaseUpdate.execute({type: "b", ...input});

        expect(result.name).toBe("Product B Updated");
        expect(result.price).toBe(40);
    });

 
});
