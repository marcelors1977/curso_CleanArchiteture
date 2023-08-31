import { createFakeCustomer } from "../../_generator-fake-data";
import MapperCustomerToModel from "./customer-to-model";

describe("Mapper customer-to-model unit test", () => {
    it("should convert customer to model", () => {
       const customer = {
        id: "1",
        name: "Customer 1",
       }

       const customerModel = new MapperCustomerToModel().convertTo(customer);

       expect(customerModel).toStrictEqual({
           id: customer.id,
           name: customer.name,
           rewardPoints: 0,
           active: false,
           hasAddress: false
       });
    });

    it("should convert customer with address to model", () => {
        const customer = createFakeCustomer({withAddress: true});

        let customerModel = new MapperCustomerToModel().convertTo(customer);

        expect(customerModel).toStrictEqual({
            id: customer.id,
            name: customer.name,
            rewardPoints: customer.rewardPoints,
            active: customer.isActive(),
            street: customer.address.street,
            number: customer.address.number,
            city: customer.address.city,
            zipcode: customer.address.zipcode,
            hasAddress: true
        });

        customer.activate();

        customerModel = new MapperCustomerToModel().convertTo(customer);

        expect(customerModel).toStrictEqual({
            ...customerModel,
            hasAddress: true,
            active: true
        });
    });

    it("should convert customer when addRewardPoints to model", () => {
        const customer = createFakeCustomer({withActive: true, withAddress: true, rewards: 10});

        const customerModel = new MapperCustomerToModel().convertTo(customer);

        expect(customerModel).toStrictEqual({
            ...customerModel,
            hasAddress: true,
            rewardPoints: 10
        });
    })
});