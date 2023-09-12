import Notification from "../../../_shared/notification/notification";
import ValidatorInterface from "../../../_shared/validator/validator.interface";
import ProductInterface from "../../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<ProductInterface, Notification> {
    validate(entity: ProductInterface): Notification {
        const notification = new Notification();
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
                price: yup
                    .number()
                    .nullable()
                    .min(1,"Price must be greater than zero")
                    .required("Price must be greater than zero"),
            })
            .validateSync({
                id: entity.id,
                name: entity.name,
                price: entity.price
            },
            {
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach(error => {
                notification.addError({
                    message: error,
                    context: "product"
                });
            });
        }

        return notification;

    }
}