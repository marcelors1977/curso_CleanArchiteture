import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../infrastructure/product/repository/sequelize/product.repository";
import { createFakeProduct } from "../../../../infrastructure/_generator-fake-data";
import FindProductUseCase from "../find.product.usecase";


describe("Test integration in find product use case", () => {
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

    it("should find a product", async () => {
       const productRepository = new ProductRepository();
       const product = createFakeProduct();
       
       await productRepository.create(product);

       const usecase = new FindProductUseCase(productRepository);

       const result = await usecase.execute({id: product.id});

       expect(result).toEqual({
           id: product.id,
           name: product.name,
           price: product.price
       });
    });

    it("should throw an error when product not found", async () => {
        const productRepository = new ProductRepository();

        const usecase = new FindProductUseCase(productRepository);

        expect(async () => {
            await usecase.execute({id: "1"});
        }).rejects.toThrowError("Product not found");
    });
    
})