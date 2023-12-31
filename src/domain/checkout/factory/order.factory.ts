import Order from "../entity/order";
import OrderInterface from "../entity/order.interface";
import OrderItem from "../entity/order_item";

type OrderFactoryProps = OrderInterface

export default class OrderFactory {
    static create(props: OrderFactoryProps): Order {

        const { id, customerId, items } = props;

        const orderItems = items.map(item => {

            return new OrderItem(item);
        });

        return new Order({id, customerId, items: orderItems});

    }
}