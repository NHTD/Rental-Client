import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Navigation.module.scss";
import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../../utils/common/common";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/actions/category";

const cx = classNames.bind(styles);
const Navigation = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  }, [dispatch]);

  return (
    <div className={cx("system__nav")}>
      <div className={cx("system__nav-inner")}>
        <div className={cx("system__nav-text")}>
          <NavLink to={"/"}>Trang chủ</NavLink>
        </div>
        {category?.length > 0 &&
          category.map((el) => (
            <div key={el.code} className={cx("system__nav-text")}>
              <NavLink to={`${formatVietnameseToString(el.value)}`}>
                {el.value}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Navigation;
