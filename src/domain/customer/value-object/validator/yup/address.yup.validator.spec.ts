import Notification from "../../../../_shared/notification/notification";
import addressYupValidator from "./address.yup.validator";

describe("Address yup validator unit test", () => {
    it("should throw an error when street is empty", () => {
        const addressValidator = new addressYupValidator();
        let _notification = new Notification();
        
        addressValidator.validate({street: "", number: 1, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: null, number: 1, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: undefined, number: 1, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ])
    });

    it("should throw an error when number is invalid", () => {
        const addressValidator = new addressYupValidator();
        let _notification = new Notification();
        
        addressValidator.validate({street: "Street", number: 0, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: null, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: undefined, zipcode: "Zip", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when zip is invalid", () => {
        const addressValidator = new addressYupValidator();
        let _notification = new Notification();
        
        addressValidator.validate({street: "Street", number: 1, zipcode: "", city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: 1, zipcode: null, city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"  
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: 1, zipcode: undefined, city: "City", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when city is invalid", () => {
        const addressValidator = new addressYupValidator();
        let _notification = new Notification();
        
        addressValidator.validate({street: "Street", number: 1, zipcode: "Zip", city: "", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: 1, zipcode: "Zip", city: null, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);

        _notification = new Notification();
        addressValidator.validate({street: "Street", number: 1, zipcode: "Zip", city: undefined, _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when all values are invalid", () => {
        const addressValidator = new addressYupValidator();
        const _notification = new Notification();

        addressValidator.validate({street: "", number: 0, zipcode: "", city: "", _notification});
        expect(_notification.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            },
            {
                message: "Number is required",
                context: "address"
            },
            {
                message: "Zip is required",
                context: "address"
            },
            {
                message: "City is required",
                context: "address"
            }
        ]);

    });
});
