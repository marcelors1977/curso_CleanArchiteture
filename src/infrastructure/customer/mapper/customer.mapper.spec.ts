import { Sequelize } from "sequelize-typescript";
import { createFakeCustomer } from "../../_generator-fake-data";
import CustomerModel from "../repository/sequelize/customer.model";
import CustomerMapper from "./customer.mapper";
import Notification from "../../../domain/_shared/notification/notification";

describe("Customer Mapper unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should convert customer to model", () => {
       const customer = {
        id: "1",
        name: "Customer 1",
       }

       const customerModel = new CustomerMapper().convertToModel(customer);

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

        let customerModel = new CustomerMapper().convertToModel(customer);

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

        customerModel = new CustomerMapper().convertToModel(customer);

        expect(customerModel).toStrictEqual({
            ...customerModel,
            hasAddress: true,
            active: true
        });
    });

    it("should convert customer when addRewardPoints to model", () => {
        const customer = createFakeCustomer({withActive: true, withAddress: true, rewards: 10});

        const customerModel = new CustomerMapper().convertToModel(customer);

        expect(customerModel).toStrictEqual({
            ...customerModel,
            hasAddress: true,
            rewardPoints: 10
        });
    });

    it("should convert model to customer without address", () => {
        const customerModel = new CustomerModel({
            id: "1",
            name: "Customer 1",
            rewardPoints: 0
        });

        const customer = new CustomerMapper().convertToDomain(customerModel);

        expect(customer).toEqual({
            _notification: new Notification(),
            _id: customerModel.id,
            _name: customerModel.name,
            _rewardPoints: customerModel.rewardPoints,
            _active: false
        });
    });

    it("should convert model to customer with address", () => {
        const customerModel = new CustomerModel({
            id: "1",
            name: "Customer 1",
            rewardPoints: 0,
            hasAddress: true,
            street: "Street 1",
            number: 1,
            zipcode: "Zip 1",
            city: "City 1"
        });

        const customer = new CustomerMapper().convertToDomain(customerModel)

        expect(customer).toEqual({
            _notification: new Notification(),
            _id: customerModel.id,
            _name: customerModel.name,
            _rewardPoints: customerModel.rewardPoints,
            _active: false,
            _address: {
                _street: customerModel.street,
                _number: customerModel.number,
                _zip: customerModel.zipcode,
                _city: customerModel.city
            }
        });
    });

    it("should convert model to customer when addRewardPoints and activate", () => {
        const customerModel = new CustomerModel({
            id: "1",
            name: "Customer 1",
            rewardPoints: 10,
            hasAddress: true,
            street: "Street 1",
            number: 1,
            zipcode: "Zip 1",
            city: "City 1",
            active: true
        });

        const customer = new CustomerMapper().convertToDomain(customerModel);

        expect(customer).toEqual({
            _notification: new Notification(),
            _id: customerModel.id,
            _name: customerModel.name,
            _rewardPoints: customerModel.rewardPoints,
            _active: true,
            _address: {
                _street: customerModel.street,
                _number: customerModel.number,
                _zip: customerModel.zipcode,
                _city: customerModel.city
            }
        })
    })
});