import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Header from "../Header/Header";
import { Outlet, useSearchParams } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import { Contact, Intro } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getProvinces, getUserDetail, socialLoginCallback } from "../../../store/actions";

const cx = classNames.bind(styles);

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProvinces());
      isLoggedIn && dispatch(getUserDetail());
    }, 100);
  }, []);

  return (
    <div className={cx("container")}>
      <Header />
      <Navigation />
      {isLoggedIn && <Search />}
      <div className={cx("outlet")}>
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
};

export default Home;
