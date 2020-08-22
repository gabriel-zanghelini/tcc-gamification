import { observable } from "mobx";

class User {
	@observable id = null;
	@observable name = null;
	@observable email = null;
	@observable password = null;
	@observable reputationPoints = null;

	constructor(user) {
		this.id = user.id;
		this.name = user.name;
		this.email = user.email;
		this.password = user.password;
		this.reputationPoints = user.reputationPoints;
	}
}

export default User;