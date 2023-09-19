import ValidatorInterface from "../../../../_shared/validator/validator.interface";
import AddressInterface from "../../address.interface";
import * as yup from "yup";

export default class implements ValidatorInterface<AddressInterface> {
    validate(entity: AddressInterface): void {
        try {
            yup.object().shape({
                street: yup.string().nullable().required("Street is required"),
                number: yup.number().nullable().min(1,"Number is required").required("Number is required"),
                zip: yup.string().nullable().required("Zip is required"),
                city: yup.string().nullable().required("City is required")
            })
            .validateSync({
                street: entity.street,
                number: entity.number,
                zip: entity.zipcode,
                city: entity.city
            },
            {
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                entity._notification.addError({
                    message: error,
                    context: "address"
                });
            });
        }
    }
}