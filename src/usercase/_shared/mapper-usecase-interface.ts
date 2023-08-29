export default interface MapperUserCaseInterface<T,U> {
    convertTo(data: T): U;
}