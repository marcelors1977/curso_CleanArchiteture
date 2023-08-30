import AddressInterface from "./address.interface";

const addressValidate = (props: AddressInterface) => {
    if (props.street === undefined || props.street === null || props.street.length === 0) {
        throw new Error('Street is required');
    }
    if (props.number === undefined || props.number === null || props.number === 0) {
        throw new Error('Number is required');
    }
    if (props.zip === undefined || props.zip === null || props.zip.length === 0) {
        throw new Error('Zip is required');
    }
    if (props.city === undefined || props.city === null || props.city.length === 0) {
        throw new Error('City is required');
    }
}

const checkIfHasAddress = (props: any): boolean => {
    return props.street || props.number || props.zip || props.city ? true : false;
}

export  { addressValidate, checkIfHasAddress }