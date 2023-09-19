import Notification from "../../_shared/notification/notification";
import AddressInterface from "../value-object/address.interface";

export default interface CustomerInterface {
    id: string;
    name: string;
    address?: AddressInterface;
    rewardPoints?: number;
    addRewardPoints?: (points: number) => void;
    isActive?: () => boolean;
    _notification?: Notification;
}
