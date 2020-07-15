import { CartItem } from './cart-item.dto';
import { CartPricing } from './cart-pricing.dto';

export class OrderDetails {
    public status?: string;
    public emailId?: string;
    public id?: string;
    public orderedDate?: string;
    public deliveredDate?: string;
    public cartItems?: Array<CartItem> = [];
    public pricing?: CartPricing;
}
