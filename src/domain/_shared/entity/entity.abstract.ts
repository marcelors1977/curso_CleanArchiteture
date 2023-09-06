import Notification from "../notification/notification";

export default abstract class Entity {
    protected _notification: Notification;

    constructor() {
        this._notification = new Notification();
    }
}