import type { BookModel } from "./BookModel";

export interface ShelfLoan {
  book: BookModel;
  daysLeft: number;
}
