import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderMapper from "../../mapper/order.mapper";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        const modelMapped = new OrderMapper().convertToModel(entity);

        try {
            await OrderModel.create(
                modelMapped,
                {
                    include: [{ model: OrderItemModel }]
                });

        } catch (error) {
            console.log(error);
        }
    }

    async update(entity: Order): Promise<void> {
        const orderMapper = new OrderMapper();
        const {
            id: entityOrderId, 
            items: entityOrderItems, 
            ...entityOrderOthers
        } = orderMapper.convertToModel(entity);

        const itemsIdOfOrderModelFound = (
            await this.find(entityOrderId)
        ).items;
       
        const orderItemsToBeDeleted = itemsIdOfOrderModelFound
            .filter(item => !entityOrderItems.includes(item));

        const orderItemsToBeAdded = entityOrderItems
            .filter((item: OrderItem) => !itemsIdOfOrderModelFound.includes(item));

        try {
            await OrderItemModel.destroy({
                where: {
                    id: orderItemsToBeDeleted.map(item => item.id)
                }
            });

            await OrderItemModel.bulkCreate(
                orderItemsToBeAdded.map((item: any) => ({
                    ...item,
                    order_id: entityOrderId
                }))
            );

            await OrderModel.update(
                entityOrderOthers,
                {
                    where: {
                        id: entityOrderId
                    }
                }
            );
            
        } catch (error) {
            console.log(error);
        }
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id: id
                },
                include: [{ model: OrderItemModel }],
                rejectOnEmpty: true
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        return new OrderMapper().convertToDomain(orderModel);
    }

    async findAll(): Promise<Order[]> {
        let orderModels;
        try {
            orderModels = await OrderModel.findAll({
                include: ["items"],
            });
        } catch (error) {
            console.log(error);
        }

        const orderMapper = new OrderMapper;

        return orderModels.map(orderModel => {
            return orderMapper.convertToDomain(orderModel);
        });
    }

    async findAllOrdersByCustomerId(customerId: string): Promise<Order[]> {
        let orderModels;
        try {
            orderModels = await OrderModel.findAll({
                where: {
                    customer_id: customerId
                },
                include: [{ model: OrderItemModel }]
            });
        } catch (error) {
            console.log(error);
        }

        const orderMapper = new OrderMapper();

        return orderModels.map(orderModel => {
           return orderMapper.convertToDomain(orderModel);
        });
    }
}