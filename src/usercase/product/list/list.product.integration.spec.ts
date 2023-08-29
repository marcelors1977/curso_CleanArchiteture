import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { createFakeProduct } from "../../../infrastructure/_generator-fake-data";
import ListProductUseCase from "./list.product.usecase";

describe("Test integration in create product use case", () => {
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

    it("should list all products", async () => {
       const productRepository = new ProductRepository();
       const product = createFakeProduct();
       const product2 = createFakeProduct();
       
       await productRepository.create(product);
       await productRepository.create(product2);

       const usecase = new ListProductUseCase(productRepository);

       const result = await usecase.execute({});

       expect(result.products.length).toBe(2);
       expect(result.products[0].id).toBe(product.id);
       expect(result.products[0].name).toBe(product.name);
       expect(result.products[0].price).toBe(product.price);
       expect(result.products[1].id).toBe(product2.id);
       expect(result.products[1].name).toBe(product2.name);
       expect(result.products[1].price).toBe(product2.price);
    });  
});