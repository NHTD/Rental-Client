import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";
import { apiGetCategories } from "../../../services/category";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../../utils/common/common";

const cx = classNames.bind(styles);
const Navigation = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiGetCategories();
      if (response) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className={cx("nav")}>
      <div className={cx("nav-inner")}>
        <div className={cx("nav-text")}>
          <NavLink to={"/"}>Trang chủ</NavLink>
        </div>
        {categories?.length > 0 &&
          categories.map((category) => (
            <div key={category.code} className={cx("nav-text")}>
              <NavLink to={`${formatVietnameseToString(category.value)}`}>
                {category.value}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navigation;
