import { observable } from "mobx";

class Action {
	@observable id = null;
	@observable description = null;
	@observable pointsAwarded = null;
	@observable pointsRequired = null;

	constructor(task) {
		this.id = task.id;
		this.description = task.description;
		this.pointsRequired = task.pointsRequired;
		this.pointsAwarded = task.pointsAwarded;
	}
}

export default Action;