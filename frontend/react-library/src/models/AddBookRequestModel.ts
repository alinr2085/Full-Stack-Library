export class AddBookRequestModel {
  title: string;
  auther: string;
  description: string;
  copies: number;
  category: string;
  img?: string;

  constructor(
    title: string,
    auther: string,
    description: string,
    copies: number,
    category: string,
    img: string,
  ) {
    this.title = title;
    this.auther = auther;
    this.description = description;
    this.copies = copies;
    this.category = category;
    this.img = img;
  }
}
