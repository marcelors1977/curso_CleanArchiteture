import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../infrastructure/customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../list.customer.usecase";
import { createFakeCustomer } from "../../../../infrastructure/_generator-fake-data";

describe("Test integration in list customer use case", () => {
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

   it("should list all customers", async () => {
        const customerRepository = new CustomerRepository();
        const listUseCase = new ListCustomerUseCase(customerRepository);

        const customer1 = createFakeCustomer({withAddress: true});
        const customer2 = createFakeCustomer();
       
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const output = await listUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customer1.id);
        expect(output.customers[0].name).toBe(customer1.name);
        expect(output.customers[0].address.street).toBe(customer1.address.street);
        expect(output.customers[1].id).toBe(customer2.id);
        expect(output.customers[1].name).toBe(customer2.name);
        expect(output.customers[1].address).toBeUndefined();
   }); 

   it("should throw an error when a list is empty", async () => {
        const customerRepository = new CustomerRepository();
        const listUseCase = new ListCustomerUseCase(customerRepository);

        const output = await listUseCase.execute({});

        expect(output.customers.length).toBe(0);
   });
});