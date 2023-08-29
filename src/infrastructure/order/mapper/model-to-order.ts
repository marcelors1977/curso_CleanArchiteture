import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";
import OrderModel from "../repository/sequelize/order.model";

export default class MapperModelToOrder implements MapperInfrastructureInterface<OrderModel, Order> {
    convertTo(orderModel: OrderModel): Order {
        const { 
            id,
            customer_id,
            items,
        } = orderModel;

        return new Order({
            id,
            customerId: customer_id,
            items: items.map(item => {
                return new OrderItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    productId: item.product_id,
                    quantity: item.quantity
                })
            })
        });
    }
}
