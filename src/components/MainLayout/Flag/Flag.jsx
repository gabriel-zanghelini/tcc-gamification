import React from "react";

const Flag = ({ country, square }) => {
  const classes = ["flag-icon"];

  if (country) {
    classes.push(`flag-icon-${country.toLowerCase()}`);
  }

  if (square) {
    classes.push("flag-icon-squared");
  }

  return <span className={classes.join(" ")} />;
};

export default Flag;
