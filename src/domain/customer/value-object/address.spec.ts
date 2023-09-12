import Address from "./address";

describe("Address unit test", () => {
    it("should throw an error when street is empty", () => {
        expect(() => {
            new Address({street: "", number: 1, zip: "Zip", city: "City"});
        }).toThrowError("address: Street is required");
    });

    it("should throw an error when number is invalid", () => {
        expect(() => {
            new Address({street: "Street", number: 0, zip: "Zip", city: "City"});
        }).toThrowError("address: Number is required");
    });

    it("should throw an error when zip is invalid", () => {
        expect(() => {
            new Address({street: "Street", number: 1, zip: "", city: "City"});
        }).toThrowError("address: Zip is required");
    });

    it("should throw an error when city is invalid", () => {
        expect(() => {
            new Address({street: "Street", number: 1, zip: "Zip", city: ""});
        }).toThrowError("address: City is required");
    });

    it("should throw an error when all fields are invalid", () => {
        expect(() => {
            new Address({street: "", number: 0, zip: "", city: ""});
        })
        .toThrowError(
            "address: Street is required, address: Number is required, address: Zip is required, address: City is required"
        );   
    });

});