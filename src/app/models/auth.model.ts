export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;

  constructor(token: string) {
    this.authToken = token;
    this.refreshToken = token;
    let currentDate = new Date();
    let nextYearDate = new Date(currentDate);
    nextYearDate.setFullYear(currentDate.getFullYear() + 1);
    this.expiresIn = nextYearDate;
  }
}
