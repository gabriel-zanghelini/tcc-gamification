import { observable, action, computed } from "mobx";
import CurrentUser from "model/CurrentUser";
import { createContext, useContext } from "react";

class CurrentUserStore {
  @observable currentUser?: CurrentUser;

  @action
  setUser = (user?: CurrentUser) => {
    // console.log("SET USER", user);

    if (!user) {
      this.currentUser = undefined;
    } else {
      this.currentUser = new CurrentUser(user);
    }
  };

  @action
  setRepPoints = (points: number) => {
    if (this.currentUser) {
      console.log("setRepPoints", points);
      this.currentUser.reputation_points = points;
    }
  };

  @computed
  get isLoggedIn() {
    // console.log(
    //   `IS LOGGED IN: ${!!this.currentUser} |||||||||||||||||`,
    //   this.currentUser
    // );

    return !!this.currentUser;
  }
}

export const CurrentUserStoreContext = createContext(new CurrentUserStore());

export default function useCurrentUserStore() {
  return useContext(CurrentUserStoreContext);
}
