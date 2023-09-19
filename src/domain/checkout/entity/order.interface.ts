import Notification from "../../_shared/notification/notification";
import OrderItem from "./order_item";

export default interface OrderInterface {
    id: string;
    customerId: string;
    items: OrderItem[];
    _notification?: Notification;
}