import Notification from "../../_shared/notification/notification";

export default interface ProductInterface {
    id: string;
    name: string;
    price: number;
    _notification?: Notification;

    // get id(): string;
    // get name(): string;
    // get price(): number;
}