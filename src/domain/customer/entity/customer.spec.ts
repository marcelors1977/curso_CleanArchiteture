import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit test", () => {

    it("should throw an error when id is empty", () => {
        expect(() => {
            new Customer({id: "", name: "John"});
        }).toThrowError("customer: Id is required");

        expect(() => {
            new Customer({id: null, name: "John"});
        }).toThrowError("customer: Id is required");

        expect(() => {
            new Customer({id: undefined, name: "John"});
        }).toThrowError("customer: Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => {
            new Customer({id: "123", name: ""});
        }).toThrowError("customer: Name is required");

        expect(() => {
            new Customer({id: "123", name: null});
        }).toThrowError("customer: Name is required");

        expect(() => {
            new Customer({id: "123", name: undefined});
        }).toThrowError("customer: Name is required");
    });

    it("should throw an error when name and id is empty", () => {
        expect(() => {
            new Customer({id: "", name: ""});
        }).toThrowError("customer: Id is required, customer: Name is required");
    });

    it("should create a new Customer without address", () => {
        const customer = new Customer({id: "123", name: "Jane"});
        expect(customer.name).toBe("Jane");
    });

    it("should change name", () => {
        const customer = new Customer({id: "123", name: "John"});
        customer.changeName("Jane");

        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        const customer = new Customer({id: "123", name: "John"});
        const address = new Address({street: "Street", number: 1, zip: "Zip", city: "City"});
        customer.changeAddress(address);
        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should change address", () => {
        const customer = new Customer({id: "123", name: "John"});
        const address = new Address({street: "Street", number: 1, zip: "Zip", city: "City"});
        customer.changeAddress(address);

        expect(customer.address).toBe(address);

        const address2 = new Address({street: "Street", number: 2, zip: "Zip", city: "City"});
        customer.changeAddress(address2);

        expect(customer.address).toBe(address2);
    });

    it("should deactivate customer", () => {
        const customer = new Customer({id: "123", name: "John"});
        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });


    it("should throw an error when address is undefined when activate a customer", () => {
        expect(() => {
            const customer = new Customer({id: "123", name: "John"});
            customer.activate();
            console.log(customer._notification.getErrors());
        }).toThrowError("Address is mandatory to activat a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer({id: "123", name: "John"});
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);

    });

});