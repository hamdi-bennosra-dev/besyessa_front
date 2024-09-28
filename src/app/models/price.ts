import { PriceCurrency } from "../core/Enum/priceCurrency";

export interface Price {
    id: string; // UUID
    amount: number;
    currency: PriceCurrency; // Enum type for the currency
    productId?: string; // Reference to the product ID (if needed)
  }
  