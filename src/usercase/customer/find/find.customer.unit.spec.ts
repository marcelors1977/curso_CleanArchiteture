import { createFakeCustomer, newFakeAddressEntity } from "../../../infrastructure/_generator-fake-data";
import FindCustomerUseCase from "./find.customer.usecase";
import FindOutputMapper from "./find.output.mapper";

const customer = createFakeCustomer();

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn()
    }
}

describe("Unit test for find customer use case", () => {

    it("should find a customer without address", async () => {
       const customerRepository = MockRepository();
       const usecase = new FindCustomerUseCase(customerRepository);

       const result = await usecase.execute({id: customer.id});

       expect(result).toEqual(new FindOutputMapper().convertTo(customer));
    });

    it("should find a customer with address, rewards and activate", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const address = newFakeAddressEntity();
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        const result = await usecase.execute({id: customer.id});
        expect(result).toEqual(new FindOutputMapper().convertTo(customer));
    });

    it("should throw an error when customer not found", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });

        const usecase = new FindCustomerUseCase(customerRepository);

        expect(() => {
            return usecase.execute({id: customer.id});
        }).rejects.toThrowError("Customer not found");
    });
    
})