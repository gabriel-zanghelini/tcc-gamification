import { observable, action, computed } from "mobx";
import { createContext, useContext } from "react";

class KanbanBoardStore {
  @observable todo: any = [];
  @observable doing: any = [];
  @observable done: any = [];

  @action
  setTodo = (tasks: any) => {
    this.todo = tasks;
  };

  @action
  setDoing = (tasks: any) => {
    this.doing = tasks;
  };

  @action
  setDone = (tasks: any) => {
    this.done = tasks;
  };

  // @computed get todoColumn() {
  //   return this.setColumnTasks("todo", 1, this.todo);
  // }

  // @computed get doingColumn() {
  //   return this.setColumnTasks("doing", 2, this.doing);
  // }

  // @computed get doneColumn() {
  //   return this.setColumnTasks("done", 2, this.done);
  // }

  // setColumnTasks = (status: string, key: number, tasks: any) => {
  //   let column = this.board.columns.find((c: any) => c.id === status);
  //   console.log("setColumnTasks", column, status, tasks);

  //   if (column) {
  //     let newColumn = { ...column };
  //     newColumn.cards = tasks;
  //     console.log(column, newColumn);

  //     const newBoard = changeColumn(this.board, column, newColumn); //update state
  //     this.setBoard(newBoard);

  //     return column;
  //   } else {
  //     let newColumn = {
  //       id: status,
  //       key: key,
  //       title: `kanban_board.${status}`,
  //       cards: tasks,
  //     };

  //     console.log("this.board, newColumn", this.board, newColumn);

  //     const newBoard = addColumn(this.board, newColumn); //update state
  //     console.log("newBoard", newBoard);
  //     newBoard.columns.sort((a: any, b: any) => a.key - b.key);
  //     this.setBoard(newBoard);

  //     return newColumn;
  //   }
  // };

  // @computed get kanbanBoard() {
  //   if (!this.todo || !this.doing || !this.done) {
  //     return {
  //       columns: [],
  //     };
  // 	}

  //   return {
  //     columns: [this.todo, this.doing, this.done],
  //   };
  // }
}

export const KanbanBoardStoreContext = createContext(new KanbanBoardStore());

export default function useKanbanBoardStore() {
  return useContext(KanbanBoardStoreContext);
}
