import ProductInterface from "./product.interface";

export default class ProductB implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number = 0;

    constructor(props: ProductInterface) {
        const { id, name, price } = props;
        
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(): boolean {
        if (this._id === undefined || this._id === null || this._id.length === 0) {
            throw new Error('Id is required');
        }
        if ( this._name === undefined || this._name === null || this._name.length === 0) {
            throw new Error('Name is required');
        }
        if ( this._price === undefined || this._price === null || this._price < 0) {
            throw new Error('Price must be greater than zero');
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
        return this._price * 2;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }
}