import AddressInterface from "./address.interface";
import { addressValidate } from "./address.validator";

export default class Address {
    _street = "";
    _number = 0;
    _zip = "";
    _city = "";

    constructor(props: AddressInterface) {
        const { street, number, zip, city } = props;
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        addressValidate(props);
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get city(): string {
        return this._city;
    }

    get zipcode(): string {
        return this._zip;
    }
}