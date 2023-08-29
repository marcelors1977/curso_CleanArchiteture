import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";

export default class MapperCustomerToModel implements MapperInfrastructureInterface<any, CustomerInterface> {
    convertTo(customer: CustomerInterface):  any {
        return {
            id: customer.id,
            name: customer.name,
            ...(
                customer.address && {
                    street: customer.address.street,
                    number: customer.address.number,
                    zipcode: customer.address.zipcode,
                    city: customer.address.city
                }
            ),
            ...(
                customer.isActive() !== undefined && {
                    active: customer.isActive()
                }
            ),
            ...(
                customer.rewardPoints !== undefined && {
                    rewardPoints: customer.rewardPoints
                }
            )
        };
    }
}
