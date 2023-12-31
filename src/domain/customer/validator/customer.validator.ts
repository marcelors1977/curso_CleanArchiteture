import ValidatorInterface from "../../_shared/validator/validator.interface";
import CustomerInterface from "../entity/customer.interface";
import CustomerYupValidator from "./yup/customer.yup.validator";

export default class CustomerValidator {
    static create(): ValidatorInterface<CustomerInterface> {
        return new CustomerYupValidator();
    }
}