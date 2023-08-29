import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "./update.customer.dto";

export default class MapperToCustomerInterface implements MapperUserCaseInterface<InputUpdateCustomerDto, CustomerInterface>{
    convertTo(input: InputUpdateCustomerDto): CustomerInterface {
        return {
            id: input.id,
            name: input.name,
            ...(
                input.address && {
                    address: new Address({
                        street: input.address.street,
                        number: input.address.number,
                        zip: input.address.zip,
                        city: input.address.city
                    })
                }
            )
        };
    };
}

