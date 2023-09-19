import ValidatorInterface from "../../../_shared/validator/validator.interface";
import * as yup from "yup";
import CustomerInterface from "../../entity/customer.interface";

export default class CustomerYupValidator implements ValidatorInterface<CustomerInterface> {
    validate(entity: CustomerInterface): void {
        try {
            yup.object().shape({
                id: yup
                    .string()
                    .nullable()
                    .required("Id is required"),
                name: yup
                    .string()
                    .nullable()
                    .required("Name is required"),
            })
            .validateSync({
                id: entity.id,
                name: entity.name
            },
            {
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                entity._notification.addError({
                    message: error,
                    context: "customer"
                });
            });
        }
    }
}