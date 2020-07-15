import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.dto';

export class OnlineShoppingObserver {
    private userData = new BehaviorSubject(null);
    userData$ = this.userData.asObservable();

    constructor() { }
    subscribeUserData(userInfo: User) {
        this.userData.next(userInfo);
    }
}
