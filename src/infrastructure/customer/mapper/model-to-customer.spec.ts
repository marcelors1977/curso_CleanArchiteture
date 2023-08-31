import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../repository/sequelize/customer.model";
import MapperModelToCustomer from "./model-to-customer";

describe("Mapper model-to-customer unit test", () => {
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

    it("should convert model to customer without address", () => {
        const customerModel = new CustomerModel({
            id: "1",
            name: "Customer 1",
            rewardPoints: 0
        });

        const customer = new MapperModelToCustomer().convertTo(customerModel);

        expect(customer).toEqual({
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

        const customer = new MapperModelToCustomer().convertTo(customerModel);

        expect(customer).toEqual({
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

        const customer = new MapperModelToCustomer().convertTo(customerModel);

        expect(customer).toEqual({
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