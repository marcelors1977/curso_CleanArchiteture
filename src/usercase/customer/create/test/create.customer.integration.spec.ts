import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import { createFakeCustomer } from "../../../../infrastructure/_generator-fake-data";
import CreateCustomerUseCase from "../create.customer.usecase";
import CustomerMapper from "../../../../infrastructure/customer/mapper/customer.mapper";

describe("Test integration in create customer use case", () => {
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

    it("should create a customer", async () => {
       const customerRepository = new CustomerRepository();
       const customer = createFakeCustomer();

       const usecase = new CreateCustomerUseCase(customerRepository);

       const customerMappedToModel = new CustomerMapper().convertToModel(customer);

       const result = await usecase.execute(customerMappedToModel);

       expect(result).toEqual({
           id: customer.id,
           name: customer.name,
           rewardPoints: 0,
           active: false
       });
    });
});