import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import { createFakeCustomer } from "../../../../infrastructure/_generator-fake-data";
import FindCustomerUseCase from "../find.customer.usecase";

describe("Test integration in find customer use case", () => {
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

    it("should find a customer", async () => {
       const customerRepository = new CustomerRepository();
       const customer = createFakeCustomer({withAddress: true});
       
       await customerRepository.create(customer);

       const usecase = new FindCustomerUseCase(customerRepository);

       const result = await usecase.execute({id: customer.id});

       expect(result).toEqual({
           id: customer.id,
           name: customer.name,
           address: {
               street: customer.address.street,
               number: customer.address.number,
               zip: customer.address.zipcode,
               city: customer.address.city
           },
           rewardPoints: customer.rewardPoints,
           active: customer.isActive()
       });
    });
    
})