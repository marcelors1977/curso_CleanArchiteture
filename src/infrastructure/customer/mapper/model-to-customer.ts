import Customer from "../../../domain/customer/entity/customer";
import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import Address from "../../../domain/customer/value-object/address";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";
import CustomerModel from "../repository/sequelize/customer.model";

export default class MapperModelToCustomer implements MapperInfrastructureInterface<CustomerModel, CustomerInterface> {
    convertTo(customerModel: CustomerModel): CustomerInterface {
        const {
            id,
            name,
            rewardPoints,
            hasAddress,
            active,
        } = customerModel;

        const customer = new Customer({id, name});

        if (hasAddress) {
            customer.changeAddress(
                new Address({
                    street: customerModel.street,
                    number: customerModel.number,
                    zip: customerModel.zipcode,
                    city: customerModel.city
                })
            );
        } 

        customer.addRewardPoints(rewardPoints);

        if(active) {
            customer.activate();
        }

        return customer;
    }
}
