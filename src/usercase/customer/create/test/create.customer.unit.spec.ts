import { createFakeCustomer, newFakeAddressEntity } from "../../../../infrastructure/_generator-fake-data";
import CreateCustomerUseCase from "../create.customer.usecase";

const customer = createFakeCustomer();

const address = newFakeAddressEntity();

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test create customer use case", () => {

    
    it("should create a new customer without address", async () => {
        const customerRepository = MockRepository();
        const usecaseCreate = new CreateCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
            name: customer.name,
        }

        const {rewardPoints, active, ...result} = await usecaseCreate.execute(input);

        expect(result).toStrictEqual(input);
        expect(rewardPoints).toBe(0);
        expect(active).toBe(false);
    });

    it("should create a new customer with address", async () => {
        const customerRepository = MockRepository();
        const usecaseCreate = new CreateCustomerUseCase(customerRepository);

        customer.changeAddress(address);

        const input = {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                zip: address.zipcode,
                city: address.city
            }
        }

        const {rewardPoints, active, ...result} = await usecaseCreate.execute(input);

        expect(result).toStrictEqual(input);
        expect(rewardPoints).toBe(0);
        expect(active).toBe(false);
    });

    it("should create a new customer and activate it", async () => {
        const customerRepository = MockRepository();
        const usecaseCreate = new CreateCustomerUseCase(customerRepository);

        customer.changeAddress(address);
        customer.activate();

        const input = {
            id: customer.id,
            name: customer.name,
            address: {
                street: address.street,
                number: address.number,
                zip: address.zipcode,
                city: address.city
            },
            active: true
        }

        const {rewardPoints, ...result} = await usecaseCreate.execute(input);

        expect(result).toStrictEqual(input);
        expect(rewardPoints).toBe(0);
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const usecaseCreate = new CreateCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
            name: customer.name
        }

        await expect(usecaseCreate.execute({
            id: input.id,
            name: "",
        })).rejects.toThrowError("Name is required");
    });

    it("should throw an error when street is missing", async () => {
        const customerRepository = MockRepository();
        const usecaseCreate = new CreateCustomerUseCase(customerRepository);

        await expect(usecaseCreate.execute({
            id: "123",
            name: "John Doe",
            address: {
                street: "",
                number: address.number,
                zip: address.zipcode,
                city: address.city
            }
        })).rejects.toThrowError("Street is required");
    });
});