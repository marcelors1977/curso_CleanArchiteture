import ValidatorInterface from "../../../_shared/validator/validator.interface";
import AddressInterface from "../address.interface";
import addressYupValidator from "./yup/address.yup.validator";

export default class AddressValidator {
    static create(): ValidatorInterface<AddressInterface> {
        return new addressYupValidator();
    }
}