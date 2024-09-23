import React from "react";
import styles from "./SubItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment/moment";
import "moment/locale/vi";

const cx = classNames.bind(styles);

const SubItem = ({ title, price, time }) => {
  return (
    <div className={cx("sub__item")}>
      <img
        src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D"
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
