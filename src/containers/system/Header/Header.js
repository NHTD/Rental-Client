import React from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Navigation from "../Navigation/Navigation";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <div className={cx("header")}>
      <div className={cx("header__brand")}>Phongtro123.com</div>
      <div className={cx("header__nav")}>
        <Navigation />
      </div>
    </div>
  );
};

export default Header;
