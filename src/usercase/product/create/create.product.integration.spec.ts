import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "../find/find.product.usecase";

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

    it("should create a product B", async () => {
       const productRepository = new ProductRepository();
       const product = ProductFactory.create({
           id: "1",
           type: "b",
           name: "Product B",
           price: 10
       });
       
       await productRepository.create(product);

       const usecase = new FindProductUseCase(productRepository);

       const result = await usecase.execute({id: product.id});

       expect(result).toEqual({
           id: product.id,
           name: product.name,
           price: 20
       });
    });    
});