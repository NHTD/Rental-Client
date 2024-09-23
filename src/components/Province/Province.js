import React from "react";
import { locations } from "../../utils/constant";
import ProvinceBtn from "./ProvinceBtn";
import styles from "./Province.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Province = () => {
  return (
    <div className={cx("province-item")}>
      {locations.map((location) => (
        <ProvinceBtn key={location.id} image={location.image} name={location.name} />
      ))}
    </div>
  );
};

export default Province;
