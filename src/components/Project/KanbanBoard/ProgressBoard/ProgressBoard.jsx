import { Progress, Tooltip } from "antd";
import React from "react";

const ProgressBar = ({ todo, doing, done }) => {
  let todoCnt = todo?.length || 0;
  let doingCnt = doing?.length || 0;
  let doneCnt = done?.length || 0;

  console.log(todo, doing, done);
  console.log(todoCnt, doingCnt, doneCnt);

  let total = todoCnt + doingCnt + doneCnt;
  let percent = (doing?.length + done?.length / total) * 100;
  let successPercent = (done?.length / total) * 100;

  return (
    <Tooltip
      title={`${todo?.length} to do / ${doing?.length} in progress / ${done?.length} done`}
    >
      <Progress
        percent={percent.toFixed(2)}
        successPercent={successPercent.toFixed(2)}
      />
    </Tooltip>
  );
};

export default ProgressBar;
