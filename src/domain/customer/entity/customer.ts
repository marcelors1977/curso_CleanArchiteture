import Entity from "../../_shared/entity/entity.abstract";
import NotificationError from "../../_shared/notification/notification.error";
import CustomerValidator from "../validator/customer.validator";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends Entity  {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active = false;
    private _rewardPoints = 0;

    constructor(props: CustomerInterface) {
        super();
        const { id, name } = props;
        
        this._id = id;
        this._name = name;
        this.validate();

        if(this._notification.hasErrors()) {
            throw new NotificationError(this._notification.getErrors());
        }
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
    
    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get address(): Address {
        return this._address;
    }

    validate() {
        CustomerValidator.create().validate(this);
    }
    
    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    isActive() {
        return this._active;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is mandatory to activate a customer');
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
    
}