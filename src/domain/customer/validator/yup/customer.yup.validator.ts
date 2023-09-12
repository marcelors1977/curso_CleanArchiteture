import ValidatorInterface from "../../../_shared/validator/validator.interface";
import * as yup from "yup";
import CustomerInterface from "../../entity/customer.interface";
import Notification from "../../../_shared/notification/notification";

export default class CustomerYupValidator implements ValidatorInterface<CustomerInterface,Notification> {
    validate(entity: CustomerInterface): Notification {
        const notification = new Notification();
        try {
            yup.object().shape({
                id: yup.string().nullable().required("Id is required"),
                name: yup.string().nullable().required("Name is required"),
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
                notification.addError({
                    message: error,
                    context: "customer"
                });
            });
        }

        return notification;
    }
}