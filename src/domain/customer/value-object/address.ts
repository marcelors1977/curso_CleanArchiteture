import Entity from "../../_shared/entity/entity.abstract";
import NotificationError from "../../_shared/notification/notification.error";
import AddressInterface from "./address.interface";
import AddressValidator from "./validator/address.validator";

export default class Address extends Entity {
    _street = "";
    _number = 0;
    _zip = "";
    _city = "";

    constructor(props: AddressInterface) {
        super();
        const { street, number, zip, city } = props;
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;

        this.validate();

        if(this._notification.hasErrors()) {
            throw new NotificationError(this._notification.getErrors());
        }
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

    validate() {
        const { street, number, zipcode: zip, city } = this;
        const notifications = 
            AddressValidator
            .create()
            .validate({street, number, zip, city});

        notifications.getErrors().forEach(error => {
            this._notification.addError(error);
        });
    }
}