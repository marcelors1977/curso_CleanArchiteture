import { createFakeCustomer, newFakeAddressEntity } from "../../../infrastructure/_generator-fake-data";
import UpdateCustomerUseCase from "./update.customer.usecase";

const MockRepository = (customer: any) => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
};

describe("Unit test update customer use case", () => {
    it("should update a customer name", async () => {
        const customerReturnFind = createFakeCustomer();
        customerReturnFind.changeName("John Updated");

        const customerRepository = MockRepository(customerReturnFind);
        const usecaseUpdate = new UpdateCustomerUseCase(customerRepository);


        const input = {
            id: customerReturnFind.id,
            name: "John Updated"
        };        

        const result = await usecaseUpdate.execute(input);
        expect(result).toEqual(input);
    });

    it("should update a customer address", async () => {
        const customerReturnFind = createFakeCustomer({withAddress: true});
        const customerRepository = MockRepository(customerReturnFind);
        const usecaseUpdate = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customerReturnFind.id,
            name: customerReturnFind.name,
            address: {
                street: customerReturnFind.address.street,
                number: customerReturnFind.address.number,
                zip: customerReturnFind.address.zipcode,
                city: customerReturnFind.address.city
            }
        };        

        const result = await usecaseUpdate.execute(input);
        expect(result).toEqual(input);
    });

    it("should update when activate a customer address", async () => {
        const customerReturnFind = createFakeCustomer({withAddress: true, withActive: true});
        const customerRepository = MockRepository(customerReturnFind);
        const usecaseUpdate = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customerReturnFind.id,
            name: customerReturnFind.name,
            address: {
                street: customerReturnFind.address.street,
                number: customerReturnFind.address.number,
                zip: customerReturnFind.address.zipcode,
                city: customerReturnFind.address.city
            },
            active: true
        };        

        const result = await usecaseUpdate.execute(input);
        expect(result).toEqual(input);
    });

    it("should update when increase points to a customer", async () => {
        const customerReturnFind = createFakeCustomer({rewards: 10});
        const customerRepository = MockRepository(customerReturnFind);
        const usecaseUpdate = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customerReturnFind.id,
            name: customerReturnFind.name,
            rewardPoints: 10
        };        

        const result = await usecaseUpdate.execute(input);
        expect(result).toEqual(input);
    });
});
