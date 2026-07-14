export interface ReviewModel {
  id: number;
  user_email: string;
  date: string;
  rating: number;
  book_id: number;
  review_description?: string;
}
