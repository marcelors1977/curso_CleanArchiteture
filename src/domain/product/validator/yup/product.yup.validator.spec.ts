import ProductYupValidator from "./product.yup.validator";

describe("Product Yup Validator unit test", () => {
    it("should throw an error when id is empty", () => {
        const productValidator = new ProductYupValidator();
        
        const validate1 = productValidator.validate({id: "", name: "John", price: 1});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "product"
            }
        ]);

        const validate2 = productValidator.validate({id: null, name: "John", price: 1});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "product"
            }
        ]);

        const validate3 = productValidator.validate({id: undefined, name: "John", price: 1});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "product"
            }
        ]);
    });

    it("should throw an error when name is empty", () => {
        const productValidator = new ProductYupValidator();

        const validate1 = productValidator.validate({id: "123", name: "", price: 1});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);

        const validate2 = productValidator.validate({id: "123", name: null, price: 1});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);

        const validate3 = productValidator.validate({id: "123", name: undefined, price: 1});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);
    });

    it("should throw an error when price is invalid", () => {
        const productValidator = new ProductYupValidator();

        const validate1 = productValidator.validate({id: "123", name: "John", price: 0});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);

        const validate2 = productValidator.validate({id: "123", name: "John", price: null});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);

        const validate3 = productValidator.validate({id: "123", name: "John", price: undefined});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);
    });
});