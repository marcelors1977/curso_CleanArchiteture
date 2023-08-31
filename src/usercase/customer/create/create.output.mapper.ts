import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import { OutputCreateCustomerDto } from "./create.customer.dto";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";

export default class MapperToOutputDto implements MapperUserCaseInterface<CustomerInterface, OutputCreateCustomerDto>{
    convertTo(input: CustomerInterface): OutputCreateCustomerDto {
        return {
            id: input.id,
            name: input.name,
            ...(
                input.address && {
                    address: {
                        street: input.address.street,
                        number: input.address.number,
                        zip: input.address.zipcode,
                        city: input.address.city
                    }
                }
            ),
            rewardPoints: input.rewardPoints ? input.rewardPoints : 0,
            active: input.isActive() ? input.isActive() : false

        };
    }
}

