export interface Product {
    id: string; // UUID
    reference: string;
    publishedBy: string; // UUID of the admin who published it
    loanedBy?: string; // UUID of the client (optional if not yet loaned)
    isAvailable: boolean;
    publishedOn: Date;
    //productModel?: ProductModel;
    //currentPrice?: Price;
    //previousPrices?: Price[];
  }
  