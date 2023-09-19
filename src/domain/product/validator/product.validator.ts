import ValidatorInterface from "../../_shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";
import ProductYupValidator from "./yup/product.yup.validator";

export default class ProductValidator {
    static create(): ValidatorInterface<ProductInterface> {
        return new ProductYupValidator();
    }
}