import request from "supertest";
import {app, sequelize} from "../express";
import { createFakeCustomer } from "../../_generator-fake-data";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";

describe("E@E test for customer", () => {
   beforeEach(async () => {
       await sequelize.sync({ force: true });
   });

   afterAll(async () => {
       await sequelize.close();
   });

   it("should create a new customer", async () => {
     const response = await request(app)
        .post("/customer")
        .send({
            id: "1",
            name: "Customer 1",
            address: {
                street: "Street 1",
                number: 1,
                zip: "00000-000",
                city: "City 1"
            }
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Customer 1");
        expect(response.body.address.street).toBe("Street 1");
        expect(response.body.address.number).toBe(1);
        expect(response.body.address.zip).toBe("00000-000");
        expect(response.body.address.city).toBe("City 1");
   });

   it("should throw error when create customer", async () => {
        const response = await request(app)
            .post("/customer")
            .send({
                id: "1",
                name: "Customer 1"
            });
        
        expect(response.status).toBe(500);
        
   });

   it("should list all customers", async () => {
        const customer1 = createFakeCustomer({withAddress: true});
        const customer2 = createFakeCustomer({withAddress: true});

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const listResponse = await request(app).get("/customer").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customerResponse1 = listResponse.body.customers[0];
        expect(customerResponse1.name).toBe(customer1.name);
        expect(customerResponse1.address.street).toBe(customer1.address.street);
        const customerResponse2 = listResponse.body.customers[1];
        expect(customerResponse2.name).toBe(customer2.name);
        expect(customerResponse2.address.street).toBe(customer2.address.street);
   });

});