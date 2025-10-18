import { Entity } from "../utils/types/Entity.js";
import type { Product } from "./Product.js";

export interface OrderItem extends Entity {
  orderId: string;     
  productId: string;      
  quantity: number;    
  unitPrice: number;     
  subtotal: number;   
  product?: Product;      
}
