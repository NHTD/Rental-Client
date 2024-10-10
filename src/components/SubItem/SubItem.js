import React from "react";
import styles from "./SubItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";
import "moment/locale/vi";

const cx = classNames.bind(styles);

const SubItem = ({ title, price, time, images }) => {
  return (
    <div className={cx("sub__item")}>
      <img
        src={images[0]?.image}
        alt="img"
        className={cx("sub__item-img")}
      />
      <div className={cx("sub__item-content")}>
        <h4 className={cx("sub__item-title", "line-clamp")}>{title}</h4>
        <div className={cx("sub__item-row")}>
          <span className={cx("sub__item-price")}>{price}</span>
          <span className={cx("sub__item-time")}>{moment(time).fromNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default SubItem;
