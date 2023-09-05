import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import Address from "../../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto } from "../dto/update.customer.dto";
import { OutputFindCustomerDto } from "../../find/dto/find.customer.dto";

export default class MapperUseCaseUpdate implements MapperUseCaseInterface {
    convertToDomain(input: InputUpdateCustomerDto): CustomerInterface {
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
    }
        
    convertToOutputUseCase(data: CustomerInterface): OutputFindCustomerDto {
        const output: OutputFindCustomerDto = {
            id: data.id,
            name: data.name,
            ...(
                data.address && {
                    address: {
                        street: data.address.street,
                        number: data.address.number,
                        zip: data.address.zipcode,
                        city: data.address.city
                    }
                }
            ),
            rewardPoints: data.rewardPoints ? data.rewardPoints : 0,
            active: data.isActive() ? data.isActive() : false
        }

        return output;
    }
}

