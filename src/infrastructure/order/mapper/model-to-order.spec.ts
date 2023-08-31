import { Sequelize } from "sequelize-typescript";
import OrderModel from "../repository/sequelize/order.model";
import MapperModelToOrder from "./model-to-order";
import CustomerModel from "../../customer/repository/sequelize/customer.model";
import OrderItemModel from "../repository/sequelize/order-item.model";
import ProductModel from "../../product/repository/sequelize/product.model";

describe("Mapper model-to-order unit test", () => {
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

        const order = new MapperModelToOrder().convertTo(orderModel);

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
});