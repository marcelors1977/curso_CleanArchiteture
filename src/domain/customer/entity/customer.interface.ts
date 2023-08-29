import Address from "../value-object/address";

export default interface CustomerInterface {
    id: string;
    name: string;
    address?: Address;
    rewardPoints?: number;
    addRewardPoints?: (points: number) => void;
    isActive?: () => boolean;
}