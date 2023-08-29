import Customer from "../../../../domain/customer/entity/customer";
import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import MapperModelToCustomer from "../../mapper/model-to-customer";
import CustomerMapper from "../../mapper/model-to-customer";
import MapperCustomerToModel from "../../mapper/customer-to-model";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: CustomerInterface): Promise<void> {
        const modelMapped = new MapperCustomerToModel().convertTo(entity);
        await CustomerModel.create(modelMapped);
    }

    async update(entity: Customer): Promise<void> {
        const modelMapped = new MapperCustomerToModel().convertTo(entity);
        const {id: entityId, ...customerModel} = modelMapped;

        await CustomerModel.update(
            customerModel,
            {
                where: {
                    id: entityId
                }
            }
        );
    }

    async find(id: string): Promise<CustomerInterface> {
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id: id
                },
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        return new MapperModelToCustomer().convertTo(customerModel);

    }

    async findAll(): Promise<CustomerInterface[]> {
        const customerModels = await CustomerModel.findAll();

        const customerMapper = new CustomerMapper();

        const customers = customerModels.map(customerModel => {            
            return new MapperModelToCustomer().convertTo(customerModel);
        });

        return customers;
    }
}