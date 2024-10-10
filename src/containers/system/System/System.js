import React from "react";
import styles from "./System.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../../utils/constant";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const cx = classNames.bind(styles);

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  }

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  //   const token = localStorage.getItem('token');
  
  //   if (isLoggedIn && token) {
  //     dispatch(getUserDetail()); 
  //   }
  // }, [location.pathname]);
  
  return (
    <div className={cx("system")}>
      <Header />
      <div className={cx("system__inner")}>
        <Sidebar />
        <div className={cx("system__content")}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
