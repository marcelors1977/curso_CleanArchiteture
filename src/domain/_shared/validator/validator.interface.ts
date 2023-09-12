export default interface ValidatorInterface<T,U> {
    validate(entity: T): U;
}