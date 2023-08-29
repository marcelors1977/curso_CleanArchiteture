import Customer from "../../../domain/customer/entity/customer";
import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import Address from "../../../domain/customer/value-object/address";
import { checkIfHasAddress } from "../../../domain/customer/value-object/address.validator";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";
import CustomerModel from "../repository/sequelize/customer.model";

export default class MapperModelToCustomer implements MapperInfrastructureInterface<CustomerModel, CustomerInterface> {
    convertTo(customerModel: CustomerModel): CustomerInterface {
        const {
            id,
            name,
            rewardPoints,
            active,
            street,
            number,
            zipcode: zip,
            city
        } = customerModel;

        const customer = new Customer({id, name});

        if( checkIfHasAddress({street, number, zip, city}) ) {
            customer.changeAddress(new Address({street, number, zip, city}));
        }

        customer.addRewardPoints(rewardPoints);

        if(active) {
            customer.activate();
        }

        return customer;
    }
}
