import request from "supertest";
import {app, sequelize} from "../express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import { createFakeProduct } from "../../_generator-fake-data";

describe("E@E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a new product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                id: "1",
                name: "Product 1",
                price: 10
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(10);
    });

    it("should throw error when create product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                id: "1",
                name: "Product 1"
            });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        const productRepository = new ProductRepository();
        const product1 = createFakeProduct();
        const product2 = createFakeProduct();
        await productRepository.create(product1);
        await productRepository.create(product2);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const productResponse1 = listResponse.body.products[0];
        expect(productResponse1.name).toBe(product1.name);
        expect(productResponse1.price).toBe(product1.price);
        const productResponse2 = listResponse.body.products[1];
        expect(productResponse2.name).toBe(product2.name);
        expect(productResponse2.price).toBe(product2.price);

    });
});