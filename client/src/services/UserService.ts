
import APIService from "./APIService";

class UserService extends APIService {
  constructor() {
    super();
    this.setPath("/users"); 
  }
}

export const userService = new UserService();