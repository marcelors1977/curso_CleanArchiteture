import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";

export default class MapperCustomerToModel implements MapperInfrastructureInterface<any, CustomerInterface> {
    convertTo(customer: CustomerInterface):  any {
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
