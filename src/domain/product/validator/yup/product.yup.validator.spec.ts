import Notification from "../../../_shared/notification/notification";
import ProductYupValidator from "./product.yup.validator";

describe("Product Yup Validator unit test", () => {
    it("should throw an error when id is empty", () => {
        const productValidator = new ProductYupValidator();
        let _notification = new Notification();
       
        productValidator.validate({id: "", name: "John", price: 1, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "product"
            }
        ]);

        _notification = new Notification();
        productValidator.validate({id: null, name: "John", price: 1, _notification});
        console.log(_notification.getErrors());
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "product"
            }
        ]);
        
        _notification = new Notification();
        productValidator.validate({id: undefined, name: "John", price: 1, _notification});
        console.log(_notification.getErrors());
        expect(_notification.getErrors().map(error => error)).toMatchObject([
            {
                message: "Id is required",
                context: "product"
            }
        ]);
    });

    it("should throw an error when name is empty", () => {
        const productValidator = new ProductYupValidator();
        let _notification = new Notification();

        productValidator.validate({id: "123", name: "", price: 1, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);

        _notification = new Notification();
        productValidator.validate({id: "123", name: null, price: 1, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);

        _notification = new Notification();
        productValidator.validate({id: "123", name: undefined, price: 1, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "product"
            }
        ]);
    });

    it("should throw an error when price is invalid", () => {
        const productValidator = new ProductYupValidator();
        let _notification = new Notification();

        productValidator.validate({id: "123", name: "John", price: 0, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);

        _notification = new Notification();
        productValidator.validate({id: "123", name: "John", price: null, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);

        _notification = new Notification();
        productValidator.validate({id: "123", name: "John", price: undefined, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Price must be greater than zero",
                context: "product"
            }
        ]);
    });
});