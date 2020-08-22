import { observable } from "mobx";

class Project {
	@observable id = null;
	@observable description = null;
	@observable tasks = [];
	@observable team = [];
	@observable leader = null;

	constructor(project) {
		this.id = project.id;
		this.description = project.description;
		this.tasks = project.tasks;
		this.team = project.team;
		this.leader = project.leader;
	}
}

export default Project;