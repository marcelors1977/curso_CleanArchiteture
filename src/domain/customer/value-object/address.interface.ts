import Notification from "../../_shared/notification/notification";

export default interface AddressInterface {
    street: string;
    number: number;
    city: string;
    zipcode: string;
    _notification?: Notification;
}