/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Alert, Button, message, Result } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Board, {
  addCard,
  moveCard,
  removeCard,
  addColumn,
  changeColumn,
} from "@lourenci/react-kanban";

import KanbanCard from "./KanbanCard";
import ProgressBar from "./ProgressBar";
import AddTaskModal from "./AddTaskModal";
import RepPointsTag from "components/Common/RepPointsTag";

import { useTranslation } from "react-i18next";
import useCurrentUserStore from "stores/CurrentUserStore";

import "@lourenci/react-kanban/dist/styles.css";
import "./kanban_style.css";

const fetcher = axios.create({
  baseURL: "/api",
});

const TASK_POINTS = {
  1: 20,
  2: 40,
  3: 60,
  4: 80,
  5: 100,
};

const setProjectDeadlineInfo = (project) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let deadline = new Date(project.deadline);

  if (today.getTime() > deadline.getTime()) project["isDelayed"] = true;
  else project["isDelayed"] = false;

  project["reputationOnComplete"] = project.isDelayed ? 150 : 500;
};

const setTaskDeadlineInfo = (task) => {
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let deadline = new Date(task.deadline);

  if (today.getTime() > deadline.getTime()) task["isDelayed"] = true;
  else task["isDelayed"] = false;

  if (task.isDelayed) {
    task.points_rewarded = task.points_rewarded * 0.3;
  }
};

const KanbanBoard = ({
  allowRemoveCard,
  allowAddCard,
  projectId,
  columns = ["todo", "doing", "done"],
}) => {
  const { t } = useTranslation();
  const [todo, setTodo] = useState(null);
  const [doing, setDoing] = useState(null);
  const [done, setDone] = useState(null);
  const [board, setBoard] = useState({ columns: [] });
  const [boardStatus, setBoardStatus] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const currentUserStore = useCurrentUserStore();
  const [projectInfo, setProjectInfo] = useState(null);

  const getTasksByStatus = async (status) => {
    // console.log("LOADING ", status);
    await fetcher
      .get(`/project/${projectId}/task/${status}`)
      .then(({ data: tasks }) => {
        tasks.forEach((t) => setTaskDeadlineInfo(t));

        switch (status) {
          case "todo":
            setTodo(tasks);
            break;
          case "doing":
            setDoing(tasks);
            break;
          case "done":
            setDone(tasks);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.error(`Can't get ${status} tasks: ${err}`);
      });
  };

  const setColumnTasks = (status, key, tasks) => {
    let column = board.columns.find((c) => c.id === status);
    // console.log(column, status, tasks);

    if (column) {
      let newColumn = { ...column };
      newColumn.cards = tasks;

      const newBoard = changeColumn(board, column, newColumn); //update state
      setBoard(newBoard);
    } else {
      let newColumn = {
        id: status,
        key: key,
        title: t(`kanban_board.${status}`),
        cards: tasks,
      };

      const newBoard = addColumn(board, newColumn); //update state
      newBoard.columns.sort((a, b) => a.key - b.key);
      setBoard(newBoard);
    }
  };

  const setUserReputation = async (points_rewarded) => {
    let userId = currentUserStore.currentUser.id;
    let userReputation = currentUserStore.currentUser.reputation_points;
    let newReputation = userReputation + points_rewarded;

    currentUserStore.currentUser.reputation_points = newReputation;

    await fetcher.put(`/user/${userId}/points/${newReputation}`);
  };

  const addUserPontuation = async (points) => {
    await fetcher
      .put("pontuation/add", {
        points,
        userId: currentUserStore.currentUser.id,
        projectId: projectId,
      })
      .then(() => {
        console.log("addUserPontuation: +", points);
      })
      .catch((err) => {
        console.error("can't addUserPontuation: +" + points, err);
      });
  };

  const removeUserPontuation = async (points) => {
    await fetcher
      .put("pontuation/rmv", {
        points,
        userId: currentUserStore.currentUser.id,
        projectId: projectId,
      })
      .then(() => {
        console.log("removeUserPontuation: +", points);
      })
      .catch((err) => {
        console.error("couldn't removeUserPontuation: +", points);
      });
  };

  const updateTask = async (card) => {
    await fetcher //update database
      .put("/task", card)
      .then(async (result) => {
        try {
          if (card.status === "done") {
            setUserReputation(card.points_rewarded)
              .then(() => {
                let msg = (
                  <span>
                    {t("kanban_board.add_task_feedback")}
                    &nbsp;
                    <RepPointsTag points={card.points_rewarded} />
                  </span>
                );
                message.info(msg, 3);
              })
              .then(() => {
                addUserPontuation(card.points_rewarded);
              });
          }
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // console.log("useEffect TODO", todo);
    if (todo) {
      setColumnTasks("todo", 1, todo);
    }
  }, [todo, t]);

  useEffect(() => {
    // console.log("useEffect DOING", doing);
    if (doing) {
      setColumnTasks("doing", 2, doing);
    }
  }, [doing, t]);

  useEffect(() => {
    // console.log("useEffect DONE", done);
    if (done) {
      setColumnTasks("done", 3, done);
    }
  }, [done, t]);

  useEffect(() => {
    if (board) {
      const todoCnt =
        board.columns?.find((c) => c.id === "todo")?.cards?.length || 0;
      const doingCnt =
        board.columns?.find((c) => c.id === "doing")?.cards?.length || 0;
      const doneCnt =
        board.columns?.find((c) => c.id === "done")?.cards?.length || 0;

      // console.log(
      //   "EFFECT PROGRESS BAR",
      //   board.columns,
      //   todoCnt,
      //   doingCnt,
      //   doneCnt
      // );

      let totalCnt = todoCnt + doingCnt + doneCnt;

      let percent = ((doingCnt + doneCnt) / totalCnt) * 100 || 0;
      let doingPercent = (doingCnt / totalCnt) * 100 || 0;
      let donePercent = (doneCnt / totalCnt) * 100 || 0;
      let status = donePercent === 100 ? "success" : "normal";

      setBoardStatus({
        percent,
        doingPercent,
        donePercent,
        status,
        todoCnt,
        doingCnt,
        doneCnt,
      });
    }
  }, [board.columns]);

  useEffect(() => {
    columns.map(async (c) => {
      // console.log("UPDATING COLUMNS", c);
      await getTasksByStatus(c);
    });
  }, []);

  useEffect(() => {
    fetcher
      .get(`project/${projectId}`)
      .then(({ data: project }) => {
        setProjectDeadlineInfo(project);
        setProjectInfo(project);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [projectId]);

  const addTask = (description, difficulty, deadline, status) => {
    let task = {
      description,
      difficulty,
      status,
      points_rewarded: TASK_POINTS[difficulty],
      project_id: projectId,
      deadline: deadline,
    };

    fetcher
      .post(`/project/${projectId}/task`, task) //update database
      .then(({ data }) => {
        let column = board.columns.find((c) => c.id === status);

        addCard(board, column, data, { on: "bottom" }); //update state
        getTasksByStatus(status);
      })
      .catch((err) => console.error(err));

    setModalVisible(false);
  };

  const removeTask = async (board, fromColumn, task) => {
    // console.log(board, fromColumn, task);

    await fetcher
      .delete(`/task/${task.id}`) //update database
      .then(async (result) => {
        try {
          let userRepPoints = currentUserStore.currentUser?.reputation_points;
          let pointsLost = task.points_rewarded / 2;
          let newReputation = userRepPoints - pointsLost;

          currentUserStore.currentUser.reputation_points = newReputation;

          await setUserReputation(newReputation).then(() => {
            let msg = (
              <span>
                {t("kanban_board.remove_task_feedback")}
                &nbsp;
                <RepPointsTag points={pointsLost} />
              </span>
            );
            message.info(msg, 3);
          });
        } catch (err) {
          console.error(err);
        }

        const newBoard = removeCard(board, fromColumn, task); //update state
        setBoard(newBoard);
      })
      .catch((err) => console.error(err));
  };

  const moveTask = async (card, source, destination) => {
    let userReputation = currentUserStore.currentUser.reputation_points;
    let newStatus = destination.toColumnId;

    console.log(`task "${card.description}" | ${card.status} -> ${newStatus}`);
    if (card.status !== newStatus) {
      if (newStatus === "done") {
        if (userReputation < card.points_rewarded) {
          let msg = (
            <span>
              {t("kanban_board.move_task_feedback1")}
              <RepPointsTag points={card.points_rewarded} />
              {t("kanban_board.move_task_feedback2")}
            </span>
          );
          message.error(msg, 3);
          return;
        }
      } else if (card.status === "done" && newStatus !== "done") {
        let msg = <span>{t("kanban_board.task_already_done")}</span>;
        message.error(msg, 3);
        return;
      }

      card.status = newStatus;

      await updateTask(card);
    }

    const newBoard = moveCard(board, source, destination); //update state
    setBoard(newBoard);
  };

  const renderCard = (task, { dragging }) => (
    <KanbanCard
      task={task}
      removeCard={() =>
        removeTask(
          board,
          board.columns.find((c) => c.id === task.status),
          task
        )
      }
      dragging={dragging}
    />
  );

  const onCancel = () => {
    setModalVisible(false);
  };

  const ProjectKanbanBoard = () => {
    return (
      <Board
        // initialBoard={board}
        disableColumnDrag
        // disableCardDrag
        allowRemoveCard={allowRemoveCard}
        allowAddCard={allowAddCard ? { on: "top" } : false}
        renderCard={renderCard}
        onCardDragEnd={moveTask}
        // onCardNew={console.log}
        // onNewCardConfirm={onNewCardConfirm}
      >
        {board}
      </Board>
    );
  };

  const AddTaskButton = () => {
    return (
      <>
        <Button
          type="primary"
          style={{ width: "400px" }}
          onClick={() => setModalVisible(true)}
        >
          {t("kanban_board.add_todo_task")}
        </Button>
        <AddTaskModal
          status="todo"
          onAdd={addTask}
          onCancel={onCancel}
          visible={modalVisible}
        />
      </>
    );
  };

  // console.log(boardStatus.status, "|", board);
  return (
    <>
      {boardStatus.status === "success" ? (
        <Result
          style={{ width: "30%", margin: "auto" }}
          status="success"
          icon={<CompleteProjectButton projectInfo={projectInfo} />}
          title={t("kanban_board.result.title")}
          subTitle={
            projectInfo?.isDelayed ? (
              <Alert
                message={
                  <span>
                    {t("kanban_board.project_result_delayed")}
                    &nbsp;
                    <RepPointsTag points={projectInfo?.reputationOnComplete} />
                  </span>
                }
                type="warning"
                showIcon
              />
            ) : (
              <Alert
                message={
                  <span>
                    {t("kanban_board.project_result_on_time")}
                    &nbsp;
                    <RepPointsTag points={projectInfo?.reputationOnComplete} />
                  </span>
                }
                type="success"
                showIcon
              />
            )
          }
        />
      ) : board ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ProgressBar projectInfo={projectInfo} boardStatus={boardStatus} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <AddTaskButton />
          </div>
          <ProjectKanbanBoard />
        </>
      ) : null}
    </>
  );
};

const CompleteProjectButton = ({ projectInfo }) => {
  const { t } = useTranslation();
  const [completed, setCompleted] = useState(false);
  const currentUserStore = useCurrentUserStore();

  const completeProject = async () => {
    await fetcher //update database
      .put(`/project/${projectInfo.id}/complete`)
      .then(async (result) => {
        try {
          let userId = currentUserStore.currentUser.id;
          let userReputation = currentUserStore.currentUser.reputation_points;
          let newReputation =
            userReputation + projectInfo?.reputationOnComplete;

          currentUserStore.currentUser.reputation_points = newReputation;

          await fetcher
            .put(`/user/${userId}/points/${newReputation}`)
            .then(() => {
              let msg = (
                <span>
                  {t("kanban_board.add_task_feedback")}
                  &nbsp;
                  <RepPointsTag points={projectInfo?.reputationOnComplete} />
                </span>
              );
              message.info(msg, 3);
              setCompleted(true);
            });
        } catch (err) {
          console.error(err);
        }
      })
      .catch((err) => console.error(err));
  };

  if (completed) {
    return <Redirect to="/home" />;
  } else {
    return (
      <Button
        type="primary"
        icon="check"
        size="large"
        onClick={() => completeProject(projectInfo.id)}
      >
        <RepPointsTag
          points={projectInfo?.reputationOnComplete}
          action="plus"
        />
      </Button>
    );
  }
};

export default KanbanBoard;
