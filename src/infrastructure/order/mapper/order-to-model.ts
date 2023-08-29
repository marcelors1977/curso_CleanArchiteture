import Order from "../../../domain/checkout/entity/order";
import MapperInfrastructureInterface from "../../_shared/mapper/mapper-infra-interface";

export default class MapperOrderToModel implements MapperInfrastructureInterface<Order, any> {
    convertTo(order: Order): any {
        return {
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: order.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                order_id: order.id,
                quantity: item.quantity,
                product_id: item.productId
            }))
        }
    }
}
