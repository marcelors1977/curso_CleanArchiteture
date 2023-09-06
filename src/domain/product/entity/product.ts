import Entity from "../../_shared/entity/entity.abstract";
import NotificationError from "../../_shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface {
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

    validate(): boolean {   
        if (this._id === undefined || this._id === null || this._id.length === 0) {
            // throw new Error('Id is required');
            this._notification.addError({message: 'Id is required', context: 'product'});
        }
        if (this._name === undefined || this._name === null || this._name.length === 0) {
            // throw new Error('Name is required');
            this._notification.addError({message: 'Name is required', context: 'product'});
        }
        if (this._price === undefined || this._price === null || this._price <= 0) {
            // throw new Error('Price must be greater than zero');
            this._notification.addError({message: 'Price must be greater than zero', context: 'product'});
        }

        return true;
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
        return this._price;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}