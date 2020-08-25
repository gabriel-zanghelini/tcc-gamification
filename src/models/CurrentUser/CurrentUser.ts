import { observable } from "mobx";

export default class CurrentUser {
  @observable fullName?: string;
  @observable picture?: string;
  @observable username?: string;
  @observable email?: string;
  @observable phone?: string;
  @observable country?: string;
  @observable city?: string;
  @observable company?: string;
  @observable division?: string;
  @observable department?: string;
  @observable section?: string;
  @observable manager?: string;
  @observable role?: string;

  constructor(user: CurrentUser) {
    this.fullName = user.fullName;
    this.picture = user.picture;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.country = user.country;
    this.city = user.city;
    this.company = user.company;
    this.division = user.division;
    this.department = user.department;
    this.section = user.section;
    this.manager = user.manager;
    this.role = user.role;
  }
}
