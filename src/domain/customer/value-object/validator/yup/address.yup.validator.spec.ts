import addressYupValidator from "./address.yup.validator";

describe("Address yup validator unit test", () => {
    it("should throw an error when street is empty", () => {
        const addressValidator = new addressYupValidator();
        
        const validate1 = addressValidator.validate({street: "", number: 1, zip: "Zip", city: "City"});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ]);

        const validate2 = addressValidator.validate({street: null, number: 1, zip: "Zip", city: "City"});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ]);

        const validate3 = addressValidator.validate({street: undefined, number: 1, zip: "Zip", city: "City"});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Street is required",
                context: "address"
            }
        ])
    });

    it("should throw an error when number is invalid", () => {
        const addressValidator = new addressYupValidator();
        
        const validate1 = addressValidator.validate({street: "Street", number: 0, zip: "Zip", city: "City"});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);

        const validate2 = addressValidator.validate({street: "Street", number: null, zip: "Zip", city: "City"});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);

        const validate3 = addressValidator.validate({street: "Street", number: undefined, zip: "Zip", city: "City"});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Number is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when zip is invalid", () => {
        const addressValidator = new addressYupValidator();
        
        const validate1 = addressValidator.validate({street: "Street", number: 1, zip: "", city: "City"});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"
            }
        ]);

        const validate2 = addressValidator.validate({street: "Street", number: 1, zip: null, city: "City"});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"  
            }
        ]);

        const validate3 = addressValidator.validate({street: "Street", number: 1, zip: undefined, city: "City"});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "Zip is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when city is invalid", () => {
        const addressValidator = new addressYupValidator();
        
        const validate1 = addressValidator.validate({street: "Street", number: 1, zip: "Zip", city: ""});
        expect(validate1.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);

        const validate2 = addressValidator.validate({street: "Street", number: 1, zip: "Zip", city: null});
        expect(validate2.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);

        const validate3 = addressValidator.validate({street: "Street", number: 1, zip: "Zip", city: undefined});
        expect(validate3.getErrors().map(error => error)).toStrictEqual([
            {
                message: "City is required",
                context: "address"
            }
        ]);
    });

    it("should throw an error when all values are invalid", () => {
        const addressValidator = new addressYupValidator();

        const validate = addressValidator.validate({street: "", number: 0, zip: "", city: ""});
        expect(validate.getErrors().map(error => error)).toStrictEqual([
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
        ])

    });
});
