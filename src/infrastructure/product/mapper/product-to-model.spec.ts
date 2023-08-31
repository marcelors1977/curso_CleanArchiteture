import MapperProductToModel from "./product-to-model";

describe("Mapper product-to-model unit test", () => {
    it("should convert product to model", () => {
        const product = {
            id: "1",
            name: "Product 1",
            price: 10
        };

        const productModel = new MapperProductToModel().convertTo(product);

        expect(productModel).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    })
});