import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/sequelize/order.model";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import OrderItemModel from "../repository/sequelize/order-item.model";
import ProductModel from "../../product/repository/sequelize/product.model";
import OrderMapper from "./order.mapper";
import { createFakeCustomer } from "../../_generator-fake-data";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Order from "../../../domain/checkout/entity/order";

describe("Order Mapper unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should convert model to order", () => {
        const orderItemModel = new OrderItemModel({
            id: "1",
            name: "Product 1",
            product_id: "1",
            order_id: "1",
            quantity: 1,
            price: 10
        });

        const orderModel = new OrderModel({
            id: "1",
            customer_id: "1",
            total: 10,
            items: [orderItemModel]
        }, {
            include: ["items"]
        });

        const order = new OrderMapper().convertToDomain(orderModel);

        expect(order).toEqual({
            _id: orderModel.id,
            _customerId: orderModel.customer_id,
            _items: [{
                _id: orderItemModel.id,
                _productId: orderItemModel.product_id,
                _quantity: orderItemModel.quantity,
                _price: orderItemModel.price,
                _name: orderItemModel.name,
            }],
            _total: orderModel.total
        });
        
    });

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

        const orderModel = new OrderMapper().convertToModel(order);

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