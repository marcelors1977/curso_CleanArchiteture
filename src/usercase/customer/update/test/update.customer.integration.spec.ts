import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import { createFakeCustomer, newFakeAddressEntity } from "../../../../infrastructure/_generator-fake-data";
import UpdateCustomerUseCase from "../update.customer.usecase";

describe("Test integration in update customer use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a customer name", async () => {
        const customerRepository = new CustomerRepository();
        const customer = createFakeCustomer();
        const address = newFakeAddressEntity();

        await customerRepository.create(customer);
        customer.changeName("John Updated");
        customer.changeAddress(address);
        customer.activate();

        const updateUseCase = new UpdateCustomerUseCase(customerRepository);

        const input = {
            id: customer.id,
            name: "John Updated",
            address: {
                street: address.street,
                number: address.number,
                zip: address.zipcode,
                city: address.city
            },
            active: customer.isActive()
        }

        const output = await updateUseCase.execute(input);

        expect(output).toEqual({
            id: customer.id,
            name: "John Updated",
            address: {
                street: address.street,
                number: address.number,
                zip: address.zipcode,
                city: address.city
            },
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints
        })
    });
});