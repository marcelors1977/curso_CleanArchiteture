import ProductB from "./product-b";

describe("Product unit test", () => {
    
    it("should throw an error when id is empty", () => {
        expect(() => {
            new ProductB({id: "", name: "John", price: 10});
        }).toThrowError("product: Id is required");

        expect(() => {
            new ProductB({id: null, name: "John", price: 10});
        }).toThrowError("product: Id is required");

        expect(() => {
            new ProductB({id: undefined, name: "John", price: 10});
        }).toThrowError("product: Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => {
            new ProductB({id: "123", name: "", price: 10});
        }).toThrowError("product: Name is required");

        expect(() => {
            new ProductB({id: "123", name: null, price: 10});
        }).toThrowError("product: Name is required");

        expect(() => {
            new ProductB({id: "123", name: undefined, price: 10});
        }).toThrowError("product: Name is required");
    });

    it("should throw an error when price is less than zero", () => {
        expect(() => {
            new ProductB({id: "123", name: "John", price: 0});
        }).toThrowError("product: Price must be greater than zero");        

        expect(() => {
            new ProductB({id: "123", name: "John", price: null});
        }).toThrowError("product: Price must be greater than zero");  
        
        expect(() => {
            new ProductB({id: "123", name: "John", price: undefined});
        }).toThrowError("product: Price must be greater than zero");  
    });

    it("should change name", () => {
        const product = new ProductB({id: "123", name: "John", price: 10});
        product.changeName("Jane");

        expect(product.name).toBe("Jane");
    });

    it("should change price", () => {
        const product = new ProductB({id: "123", name: "John", price: 10});
        product.changePrice(20);

        expect(product.price).toBe(40);
    });

    it("should throw errors when id and name are empty", () => {
        expect(() => {
            new ProductB({id: "", name: "", price: 10});
        }).toThrowError("product: Id is required, product: Name is required");
    });
});