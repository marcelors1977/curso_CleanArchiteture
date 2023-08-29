import { createFakeCustomer } from "../../../infrastructure/_generator-fake-data";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = createFakeCustomer();
const customer2 = createFakeCustomer({withAddress: true, rewards: 10, withActive: true});

const MockRepository = () => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2]))
    };
};

describe("Unit test for listing customer use case", () => {

    it("should list all customers", async () => {
        const customerRepository = MockRepository();
        const listUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address).toBeUndefined();
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address.street).toBe(customer2.address.street);
        expect(output.customers[1].rewardPoints).toBe(10);
        expect(output.customers[1].active).toBe(true);
    
    });
})