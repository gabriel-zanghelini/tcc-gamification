import { observable, action, computed } from "mobx";
import CurrentUser from "model/CurrentUser";

class CurrentUserStore {
  @observable currentUser?: CurrentUser;

  @action
  setUser = (user?: CurrentUser) => {
    console.log("SET USER", user);
    
    if (!user) {
      this.currentUser = undefined;
    } else {
      this.currentUser = new CurrentUser(user);
    }
  };

  @computed
  get isLoggedIn() {
    console.log("IS LOGGED IN", !!this.currentUser);
    
    return !!this.currentUser;
  }
}

export default new CurrentUserStore();
