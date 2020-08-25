import { observable, action, computed } from "mobx";

import CurrentUser from "models/CurrentUser";

class CurrentUserStore {
  @observable currentUser?: CurrentUser;

  @computed
  get isLoggedIn() {
    return !!this.currentUser;
  }

  @action
  setUser = (user?: CurrentUser) => {
    if (!user) {
      this.currentUser = undefined;
    } else {
      this.currentUser = new CurrentUser(user);
    }
  };
}

export default new CurrentUserStore();
