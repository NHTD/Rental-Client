import { Routes, Route } from "react-router-dom";
import {
  DetailPost,
  Home,
  HomePage,
  Login,
  Register,
  SearchDetail,
} from "./containers/public";
import { path } from "./utils/constant";
import Rental from "./containers/public/RentalApartment/Rental";
import { CreatePost, ManagePost, System } from "./containers/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAreas,
  getCategories,
  getPrices,
  getProvinces,
  getUserDetail,
} from "./store/actions";
import AccountEdition from "./containers/system/AccountEdition/AccountEdition";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classNames from "classnames/bind";
import styles from "./index.scss";
import ChangePassword from "./containers/system/ChangePassword/ChangePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { ChangePasswordV2, Contact } from "./components";
import Otp from "./containers/public/Otp/Otp";

const cx = classNames.bind(styles);

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getUserDetail());
    }, 100);
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCategories());
      dispatch(getPrices());
      dispatch(getAreas());
      dispatch(getProvinces());
    }, 100);
  }, [dispatch]);

  return (
    <div className={cx("app")}>
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="" element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route
            path={path.DETAIL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={path.CHANGE_PASSWORD_V2}
            element={<ChangePasswordV2 />}
          />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.OTP} element={<Otp />} />
          <Route path={path.CONTACT} element={<Contact />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.ACCOUNT_EDITION} element={<AccountEdition />} />
          <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
