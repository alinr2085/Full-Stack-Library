export class AdminResponseModel {
  id: number;
  adminEmail: string;
  response: string;

  constructor(id: number, adminEmail: string, response: string) {
    this.id = id;
    this.adminEmail = adminEmail;
    this.response = response;
  }
}
