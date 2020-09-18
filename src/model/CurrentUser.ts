import { observable } from "mobx";

export default class CurrentUser {
  @observable name?: string;
  @observable email?: string;
  @observable reputationPoints?: number;

  constructor(user: CurrentUser) {
    this.name = user.name;
    this.email = user.email;
    this.reputationPoints = user.reputationPoints;
  }
}
