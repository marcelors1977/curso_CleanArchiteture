import Notification from "../../../_shared/notification/notification";
import OrderItem from "../../entity/order_item";
import OrderYupValidator from "./order.yup.validator";

describe("Order Yup Validator unit test", () => {
   it("should throw an error when have many errors", () => {
       const orderValidator = new OrderYupValidator();
       const _notification = new Notification();
       const item = new OrderItem({id: "", name: null, price: undefined, productId: "p1", quantity: 0});
       orderValidator
            .validate({
                id: "", 
                customerId: undefined, 
                items: [item],
                _notification
            });
       
        expect(_notification.getErrors().map(error => error)).toContainEqual(
            {
                message: "Id is required",
                context: "order"   
            }
        );

        expect(_notification.getErrors().map(error => error)).toContainEqual(
            {
                message: "CustomerId is required",
                context: "order"
            }
        );

       expect(_notification.getErrors().map(error => error)).toContainEqual(
           {
               message: "Quantity must be greater than zero",
               context: "orderItem"
           }
       );

       expect(_notification.getErrors().map(error => error)).toContainEqual(
           {
               message: "Name is required",
               context: "orderItem"
           }
       );

       expect(_notification.getErrors().map(error => error)).toContainEqual(
           {
               message: "Price must be greater than zero",
               context: "orderItem"
           }
       );

       expect(_notification.getErrors().map(error => error)).toContainEqual(
           {
               message: "Id is required",
               context: "orderItem"
           }
       );
   });

   it("should throw an error when items is empty", () => {
        const orderValidator = new OrderYupValidator();
        const _notification = new Notification();

        orderValidator.validate({
            id: "123", 
            customerId: "123", 
            items: [], 
            _notification
        });

        expect(_notification.getErrors().map(error => error)).toContainEqual(
            {
                message: "Order needs to have almost one item",
                context: "order"
            }
        );
   });
});