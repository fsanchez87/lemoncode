import React from "react";
import * as classes from "./styles.scss";
import logo from "./content/logo_2.png";

export const HelloWorldComponent: React.FC = () => {
  return (
    <div>
      <div className={classes.centerContent}>
        <img src={logo} alt="logo_2" />
      </div>
      <p className={classes.lemonBackground}>Hello World!</p>
      <p>Check the console log ...</p>
    </div>
  );
};
