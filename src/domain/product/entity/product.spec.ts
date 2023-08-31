import Product from "./product";
describe("Product unit test", () => {
    
    it("should throw an error when id is empty", () => {
        expect(() => {
            new Product({id: "", name: "John", price: 10});
        }).toThrowError("Id is required");

        expect(() => {
            new Product({id: null, name: "John", price: 10});
        }).toThrowError("Id is required");

        expect(() => {
            new Product({id: undefined, name: "John", price: 10});
        }).toThrowError("Id is required");
    });

    it("should throw an error when name is empty", () => {
        expect(() => {
            new Product({id: "123", name: "", price: 10});
        }).toThrowError("Name is required");

        expect(() => {
            new Product({id: "123", name: null, price: 10});
        }).toThrowError("Name is required");

        expect(() => {
            new Product({id: "123", name: undefined, price: 10});
        }).toThrowError("Name is required");
    });

    it("should throw an error when price is less than zero", () => {
        expect(() => {
            new Product({id: "123", name: "John", price: 0});
        }).toThrowError("Price must be greater than zero");        

        expect(() => {
            new Product({id: "123", name: "John", price: null});
        }).toThrowError("Price must be greater than zero");  
        

        expect(() => {
            new Product({id: "123", name: "John", price: undefined});
        }).toThrowError("Price must be greater than zero");  
    });

    it("should change name", () => {
        const product = new Product({id: "123", name: "John", price: 10});
        product.changeName("Jane");

        expect(product.name).toBe("Jane");
    });

    it("should change price", () => {
        const product = new Product({id: "123", name: "John", price: 10});
        product.changePrice(20);

        expect(product.price).toBe(20);
    })
})