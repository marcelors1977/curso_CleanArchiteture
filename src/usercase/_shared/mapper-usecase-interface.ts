export default interface MapperUseCaseInterface {
    convertToDomain(data: any): any;
    convertToOutputUseCase(data: any): any;
}
