import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const Button = ({
  text,
  first = false,
  second = false,
  third = false,
  small = false,
  large = false,
  IcAfter,
  IcBefore,
  onClick,
  type = "button",
  searchBtn,
  sortBtn,
}) => {
  const props = {
    onClick,
  };

  const classes = cx("wrapper", {
    first,
    second,
    third,
    small,
    large,
    IcAfter,
    IcBefore,
    searchBtn,
    sortBtn,
  });

  return (
    <button type={type} className={classes} {...props}>
      <div className={cx("row")}>
        {IcBefore && (
          <span className={cx("icon-before")}>
            <FontAwesomeIcon icon={IcBefore} />
          </span>
        )}
        <span className={cx("row-text")}>{text}</span>
      </div>
      {IcAfter && (
        <span className={cx("icon-after")}>
          <FontAwesomeIcon icon={IcAfter} />
        </span>
      )}
    </button>
  );
};

export default memo(Button);
