export default interface MapperInfrastructureInterface<T,U> {
    convertTo(data: T): U;
}