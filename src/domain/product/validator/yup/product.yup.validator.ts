import ValidatorInterface from "../../../_shared/validator/validator.interface";
import ProductInterface from "../../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<ProductInterface> {
    validate(entity: ProductInterface): void {
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
                    .transform(value => Number.isNaN(value) ? null : value)
                    .required("Price must be greater than zero")
                    .nullable()
                    .min(1,"Price must be greater than zero"),
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
                entity._notification.addError({
                    message: error,
                    context: "product"
                });
            });
        }
    }
}