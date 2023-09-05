import Customer from "../../../../domain/customer/entity/customer";
import CustomerInterface from "../../../../domain/customer/entity/customer.interface";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerMapper from "../../mapper/customer.mapper";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: CustomerInterface): Promise<void> {
        const modelMapped = new CustomerMapper().convertToModel(entity);
        await CustomerModel.create(modelMapped);
    }

    async update(entity: Customer): Promise<void> {
        const modelMapped = new CustomerMapper().convertToModel(entity);
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

        return new CustomerMapper().convertToDomain(customerModel);

    }

    async findAll(): Promise<CustomerInterface[]> {
        const customerModels = await CustomerModel.findAll();

        const customers = customerModels.map(customerModel => {            
            return new CustomerMapper().convertToDomain(customerModel);
        });

        return customers;
    }
}