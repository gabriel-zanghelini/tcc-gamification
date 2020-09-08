import { observable, action } from "mobx";
import axios from "axios";

const fetcher = axios.create({
	baseURL: "/api/user",
  });

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

	@action
	async getAll() {
		try {
			// TODO: move to API
			
		}
		catch (e) {
			return [];
		}
	};
}

export default User;