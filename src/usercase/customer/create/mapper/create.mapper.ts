import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import Address from "../../../../domain/customer/value-object/address";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "../dto/create.customer.dto";

export default class MapperUseCaseCreate implements MapperUseCaseInterface {
    convertToOutputUseCase(data: CustomerInterface): OutputCreateCustomerDto {
        return {
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
    }

    convertToDomain(input: InputCreateCustomerDto): CustomerInterface {
        return {
            id: input.id,
            name: input.name,
            ...(
                input.address && {
                    address: new Address({
                        street: input.address.street,
                        number: input.address.number,
                        zipcode: input.address.zip,
                        city: input.address.city
                    })
                })
        };
    }
}