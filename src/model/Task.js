import { observable } from "mobx";

class Task {
	@observable id = null;
	@observable description = null;
	@observable status = null;
	@observable difficulty = [];
	@observable pointsRequired = null;

	constructor(task) {
		this.id = task.id;
		this.description = task.description;
		this.status = task.status;
		this.difficulty = task.difficulty;
		this.pointsRequired = task.pointsRequired;
	}
}

export default Task;