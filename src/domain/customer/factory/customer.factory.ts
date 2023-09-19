import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default class CustomerFactory {
    static create(props: CustomerInterface): Customer {
        return new Customer(props);
    }

    static createWithAddress(props: CustomerInterface): Customer {
        const {address, ...otherProps} = props;
        const addressObj = new Address(address);
        const customer = new Customer(otherProps);
        customer.changeAddress(addressObj);
        return customer;
    }
}