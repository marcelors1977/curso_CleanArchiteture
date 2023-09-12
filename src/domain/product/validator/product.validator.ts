import Notification from "../../_shared/notification/notification";
import ValidatorInterface from "../../_shared/validator/validator.interface";
import ProductInterface from "../entity/product.interface";
import ProductYupValidator from "./yup/product.yup.validator";

export default class productValidator {
    static create(): ValidatorInterface<ProductInterface,Notification> {
        return new ProductYupValidator();
    }
}