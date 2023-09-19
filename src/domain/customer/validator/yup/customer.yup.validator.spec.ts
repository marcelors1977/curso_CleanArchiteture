import Notification from "../../../_shared/notification/notification";
import CustomerYupValidator from "./customer.yup.validator";

describe("Customer Yup Validator unit test", () => {
    it("should throw an error when id is empty", () => {
        const customerValidator = new CustomerYupValidator();
        let _notification = new Notification();

        customerValidator.validate({id: "", name: "John", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "customer"
            }
        ]);

        _notification = new Notification();
        customerValidator.validate({id: null, name: "John", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "customer"
            }
        ]);

        _notification = new Notification();
        customerValidator.validate({id: undefined, name: "John", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "customer"
            }
        ]);
    });

    it("should throw an error when name is empty", () => {
        let _notification = new Notification();
        const customerValidator = new CustomerYupValidator();

        customerValidator.validate({id: "123", name: "", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "customer"
            }
        ]);

        _notification = new Notification();
        customerValidator.validate({id: "123", name: null, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "customer"
            }
        ]);

        _notification = new Notification();
        customerValidator.validate({id: "123", name: undefined, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "customer"
            }
        ]);
    });

    it("should throw an error when name and id is empty", () => {
        const _notification = new Notification();
        new CustomerYupValidator().validate({id: "", name: "", _notification});

        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "customer"
            },
            {
                message: "Name is required",
                context: "customer"
            }
        ]);
    });
});