import Notification from "../../../../_shared/notification/notification";
import ValidatorInterface from "../../../../_shared/validator/validator.interface";
import AddressInterface from "../../address.interface";
import * as yup from "yup";

export default class implements ValidatorInterface<AddressInterface,Notification> {
    validate(entity: AddressInterface): Notification {
        const notification = new Notification();
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
                zip: entity.zip,
                city: entity.city
            },
            {
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                notification.addError({
                    message: error,
                    context: "address"
                });
            });
        }

        return notification;
    }
}