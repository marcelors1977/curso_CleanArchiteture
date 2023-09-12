import CustomerYupValidator from "./customer.yup.validator";

describe("Customer Yup Validator unit test", () => {
    it("should throw an error when id is empty", () => {
        const customerValidator = new CustomerYupValidator().validate({id: "", name: "John"});

        expect(customerValidator.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Id is required",
                context: "customer"
            }
        ]);
    });

    it("should throw an error when name is empty", () => {
        const customerValidator = new CustomerYupValidator().validate({id: "123", name: ""});

        expect(customerValidator.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Name is required",
                context: "customer"
            }
        ]);
    });

    it("should throw an error when name and id is empty", () => {
        const customerValidator = new CustomerYupValidator().validate({id: "", name: ""});

        expect(customerValidator.getErrors().map(error => error)).toStrictEqual([
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