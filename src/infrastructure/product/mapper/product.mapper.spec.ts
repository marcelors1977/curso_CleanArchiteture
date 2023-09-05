import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import ProductMapper from "./product.mapper";

describe("Product Mapper unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should convert model to product", () => {
        const productModel = new ProductModel({
            id: "1",
            name: "Product 1",
            price: 10
        });

        const product = new ProductMapper().convertToDomain(productModel);

        expect(product).toEqual({
            _id: productModel.id,
            _name: productModel.name,
            _price: productModel.price
        });
        
    });

    it("should convert product to model", () => {
        const product = {
            id: "1",
            name: "Product 1",
            price: 10
        };

        const productModel = new ProductMapper().convertToModel(product);

        expect(productModel).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});