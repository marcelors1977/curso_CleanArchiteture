import Customer from "../../../domain/customer/entity/customer";
import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import Address from "../../../domain/customer/value-object/address";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";
import CustomerModel from "../repository/sequelize/customer.model";

export default class CustomerMapper implements MapperInfrastructureInterface {
    convertToDomain(customerModel: CustomerModel): CustomerInterface {
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
                    zipcode: customerModel.zipcode,
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

    convertToModel(customer: CustomerInterface):  any {
        return {
            id: customer.id,
            name: customer.name,
            ...(
                customer.address 
                ? {
                    hasAddress: true,
                    street: customer.address.street,
                    number: customer.address.number,
                    zipcode: customer.address.zipcode,
                    city: customer.address.city
                }
                : {
                    hasAddress: false
                }
            ),
            ...(
                typeof customer.isActive === "function" && customer.isActive() !== undefined 
                ? { active: customer.isActive() } 
                : { active: false}
            ),
            ...(
                customer.rewardPoints !== undefined 
                ? { rewardPoints: customer.rewardPoints }
                : { rewardPoints: 0 }
            )
        };
    }
}