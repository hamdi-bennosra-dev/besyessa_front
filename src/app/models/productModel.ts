export interface ProductModel {
  id: string; // UUID
  name: string;
  description: string;
  addedBy: string; // UUID of the user who added the product model
  addedOn: Date;
  //brand: Brand;
  //productType: ProductType; // Enum for product type
 // products?: Product[]; // Uncomment if needed
}
