import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import { createFakeCustomer } from "../../_generator-fake-data";
import MapperOrderToModel from "./order-to-model";

describe("Mapper order-to-model unit test", () => {
    it("should convert order to model", () => {
        const customer = createFakeCustomer();
        const orderItem = new OrderItem({
            id: "1",
            name: "Item 1",
            price: 10,
            productId: "1",
            quantity: 1
        });
        const order = new Order({
            customerId: customer.id,
            items: [orderItem],
            id: "1"
        })

        const orderModel = new MapperOrderToModel().convertTo(order);

        expect(orderModel).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: order.items.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    order_id: order.id,
                    quantity: item.quantity,
                    product_id: item.productId
                }
            })
        });
    });
});