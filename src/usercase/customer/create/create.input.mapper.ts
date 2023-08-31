import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { InputCreateCustomerDto } from "./create.customer.dto";
import Address from "../../../domain/customer/value-object/address";

export default class MapperToCustomerInterface implements MapperUserCaseInterface<InputCreateCustomerDto, CustomerInterface>{
    convertTo(input: InputCreateCustomerDto): CustomerInterface {
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
                })
        };
    }
}

