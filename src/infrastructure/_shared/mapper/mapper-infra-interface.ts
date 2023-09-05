export default interface MapperInfrastructureInterface {
    convertToDomain(data: any): any;
    convertToModel(data: any): any;
}
