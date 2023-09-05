
import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import MapperUseCaseInterface from "../../../_shared/mapper-usecase-interface";
import { InputListCustomerDto, OutputListCustomerDto } from "../dto/list.customer.dto";

export default class MapperUserCaseList implements MapperUseCaseInterface {
    convertToOutputUseCase(customer: CustomerInterface[]): OutputListCustomerDto {
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
                    rewardPoints: customer.rewardPoints ? customer.rewardPoints : 0,
                    active: customer.isActive() ? customer.isActive() : false
                }))
        };
    }   

    convertToDomain(data: InputListCustomerDto): any {
        return data;
    }
}