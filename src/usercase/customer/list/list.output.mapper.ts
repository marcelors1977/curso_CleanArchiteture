
import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { OutputListCustomerDto } from "./list.customer.dto";

export default class ListOutputMapper implements MapperUserCaseInterface<CustomerInterface[], OutputListCustomerDto> {
    convertTo(customer: CustomerInterface[]): OutputListCustomerDto {
        return {
            customers: customer.map(customer => ({
                    id: customer.id,
                    name: customer.name,
                    ...(
                        customer.address && {
                            address: {
                                street: customer.address.street,
                                number: customer.address.number,
                                zip: customer.address.zipcode,
                                city: customer.address.city
                            }
                        }
                    ),
                    ...(
                        customer.rewardPoints && {
                            rewardPoints: customer.rewardPoints
                        }
                    ),
                    ...(
                        customer.isActive() && {
                            active: customer.isActive()
                        }
                    )
                }))
        };
    };
}