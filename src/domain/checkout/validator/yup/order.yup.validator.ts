import ValidatorInterface from "../../../_shared/validator/validator.interface";
import OrderInterface from "../../entity/order.interface";
import * as yup from "yup";

export default class OrderYupValidator implements ValidatorInterface<OrderInterface> {
    validate(entity: OrderInterface): void {
        try {
            yup.object().shape({
                id: yup
                    .string()
                    .nullable()
                    .required("Id is required"),
                customerId: yup
                    .string()
                    .nullable()
                    .required("CustomerId is required"),
                items: yup
                    .array()
                    .length(1,"Order needs to have almost one item")
                    .of(yup.object().shape({
                        id: yup
                            .string()
                            .nullable()
                            .required("Id is required"),
                        productId: yup
                            .string()
                            .nullable()
                            .required("ProductId is required"),
                        name: yup
                            .string()
                            .nullable()
                            .required("Name is required"),
                        price: yup
                            .number()
                            .transform(value => Number.isNaN(value) ? undefined : value)
                            .required("Price must be greater than zero")
                            .nullable()
                            .min(1,"Price must be greater than zero"),
                        quantity: yup
                            .number()
                            .transform(value => Number.isNaN(value) ? undefined : value)
                            .nullable()
                            .min(1,"Quantity must be greater than zero")
                            .required("Quantity must be greater than zero")
                    }))
            })
            .validateSync({
                id: entity.id,
                customerId: entity.customerId,
                items: entity.items
            },
            {
                abortEarly: false
            });
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.inner.forEach(error => {
                entity._notification.addError({
                    message: error.message,
                    context: error.path.startsWith("items[") ? "orderItem" : "order"
                });
            });
        }
    }
}