import { observable } from "mobx";

export default class CurrentUser {
  @observable id?: number;
  @observable name?: string;
  @observable email?: string;
  @observable reputation_points?: number;

  constructor(user: CurrentUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.reputation_points = user.reputation_points;
  }
}
