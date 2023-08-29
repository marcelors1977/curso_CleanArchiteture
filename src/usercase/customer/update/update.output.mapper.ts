import CustomerInterface from "../../../domain/customer/entity/customer.interface";
import MapperUserCaseInterface from "../../_shared/mapper-usecase-interface";
import { OutputFindCustomerDto } from "../find/find.customer.dto";

export default class UpdateOutputMapper implements MapperUserCaseInterface<CustomerInterface, OutputFindCustomerDto> {
    convertTo(data: CustomerInterface): OutputFindCustomerDto {
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
            ...(
                data.rewardPoints && {
                    rewardPoints: data.rewardPoints
                }
            ),
            ...(
                data.isActive() && {
                    active: data.isActive()
                }
            )
        }

        return output;
    }
}