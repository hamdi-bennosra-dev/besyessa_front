export interface Reservation {
    id: string; // UUID
    loanedOn: Date;
    loanedFrom: Date;
    loanedUntil: Date;
    userId: string; // UUID of the user
    //price?: Price;
    //product?: Product;
  }
  