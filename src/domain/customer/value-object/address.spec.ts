import Address from "./address";
import { checkIfHasAddress } from "./address.validator";

describe("Address unit test", () => {
    it("should throw an error when street is empty", () => {
        expect(() => {
            const address = new Address({street: "", number: 1, zip: "Zip", city: "City"});
        }).toThrowError("Street is required");
    });

    it("should throw an error when number is empty", () => {
        expect(() => {
            const address = new Address({street: "Street", number: 0, zip: "Zip", city: "City"});
        }).toThrowError("Number is required");
    });

    it("should throw an error when zip is empty", () => {
        expect(() => {
            const address = new Address({street: "Street", number: 1, zip: "", city: "City"});
        }).toThrowError("Zip is required");
    });

    it("should throw an error when city is empty", () => {
        expect(() => {
            const address = new Address({street: "Street", number: 1, zip: "Zip", city: ""});
        }).toThrowError("City is required");
    });

    it("should create nnw address", () => {
        const address = new Address({street: "Street", number: 1, zip: "Zip", city: "City"});
        expect(address.street).toBe("Street");
        expect(address.number).toBe(1);
        expect(address.zipcode).toBe("Zip");
        expect(address.city).toBe("City");
    });

    it("should return true when at least one of required fields is not empty", () => {
        expect(checkIfHasAddress({
            number: 1,
        })).toBe(true);
    });

    it("should return false when all of required fields is empty", () => {
        expect(checkIfHasAddress({
            street: null,
            zip: "",
            city: undefined
        })).toBe(false);
    });
});