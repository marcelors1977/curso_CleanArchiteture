import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/sequelize/product.model";
import MapperModelToProduct from "./model-product";

describe("Mapper model-to-product unit test", () => {
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

        const product = new MapperModelToProduct().convertTo(productModel);

        expect(product).toEqual({
            _id: productModel.id,
            _name: productModel.name,
            _price: productModel.price
        });
        
    });
});