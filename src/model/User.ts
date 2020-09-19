import { observable, action } from "mobx";
import axios from "axios";

class User {
  @observable id = null;
  @observable name = null;
  @observable email = null;
  @observable reputationPoints = null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.reputationPoints = user.reputationPoints;
  }

  // static getAll = async () => {
  //   try {
  //     await 
  //   } catch (e) {
  //     return [];
  //   }
  // }
}

export default User;
