import React from "react";
import styles from "./ProvinceBtn.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className={cx("news-item")}>
      <img src={image} alt="HCM" className={cx("img")} />

      <p className={cx("text-desc")}>{name}</p>
    </div>
  );
};

export default ProvinceBtn;
