import RepositoryInterface from "../../_shared/repository/repository-interface";
import CustomerInterface from "../entity/customer.interface";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export default interface CustomerRepositoryInterface
    extends RepositoryInterface<CustomerInterface> {}