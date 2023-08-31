import Address from "./address";

describe("Address unit test", () => {
    it("should throw an error when street is empty", () => {
        expect(() => {
            new Address({street: "", number: 1, zip: "Zip", city: "City"});
        }).toThrowError("Street is required");

        expect(() => {
            new Address({street: null, number: 1, zip: "Zip", city: "City"});
        }).toThrowError("Street is required");

        expect(() => {
            new Address({street: undefined, number: 1, zip: "Zip", city: "City"});
        }).toThrowError("Street is required");
    });

    it("should throw an error when number is empty", () => {
        expect(() => {
            new Address({street: "Street", number: 0, zip: "Zip", city: "City"});
        }).toThrowError("Number is required");

        expect(() => {
            new Address({street: "Street", number: null, zip: "Zip", city: "City"});
        }).toThrowError("Number is required");

        expect(() => {
            new Address({street: "Street", number: undefined, zip: "Zip", city: "City"});
        }).toThrowError("Number is required");
    });

    it("should throw an error when zip is empty", () => {
        expect(() => {
            new Address({street: "Street", number: 1, zip: "", city: "City"});
        }).toThrowError("Zip is required");

        expect(() => {
            new Address({street: "Street", number: 1, zip: null, city: "City"});
        }).toThrowError("Zip is required");

        expect(() => {
            new Address({street: "Street", number: 1, zip: undefined, city: "City"});
        }).toThrowError("Zip is required");
    });

    it("should throw an error when city is empty", () => {
        expect(() => {
            new Address({street: "Street", number: 1, zip: "Zip", city: ""});
        }).toThrowError("City is required");

        expect(() => {
            new Address({street: "Street", number: 1, zip: "Zip", city: null});
        }).toThrowError("City is required");

        expect(() => {
            new Address({street: "Street", number: 1, zip: "Zip", city: undefined});
        }).toThrowError("City is required");
    });

    it("should create new address", () => {
        const address = new Address({street: "Street", number: 1, zip: "Zip", city: "City"});
        expect(address.street).toBe("Street");
        expect(address.number).toBe(1);
        expect(address.zipcode).toBe("Zip");
        expect(address.city).toBe("City");
    });
});