import Entity from "../../_shared/entity/entity.abstract";
import NotificationError from "../../_shared/notification/notification.error";
import ProductValidator from "../validator/product.validator";
import ProductInterface from "./product.interface";

export default class ProductB extends Entity {
    private _id: string;
    private _name: string;
    private _price = 0;

    constructor(props: ProductInterface) {
        super();
        const { id, name, price } = props;
        
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if(this._notification.hasErrors()) {
            throw new NotificationError(this._notification.getErrors());
        }
    }

    validate() {
        ProductValidator.create().validate(this);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }
    get price(): number {
        return this._price * 2;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}