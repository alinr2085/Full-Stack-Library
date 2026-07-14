export class MessageRequestModel {
  userEmail?: string;
  title: string;
  question: string;


  constructor(userEmail: string, title: string, question: string) {
    this.title = title;
    this.userEmail = userEmail;
    this.question = question;
  }
}
