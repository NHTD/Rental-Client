import React, { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "../../../assets/logo.png";
import { Button } from "../../../components";
import icons from "../../../utils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { menu } from "../../../utils/common/common";

const { faCirclePlus, faUserPlus, faRightToBracket } = icons;

const cx = classNames.bind(styles);

const Header = () => {
  const [isShowModal, setIsShowModal] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { userDetail } = useSelector((state) => state.user);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [params.get("page")]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const login = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  return (
    <header ref={ref} className={cx("header")}>
      <Link to={path.HOME}>
        <figure>
          <img src={logo} alt="Phongtro123" className={cx("header__logo")} />
        </figure>
      </Link>

      <div></div>

      <div className={cx("header__actions")}>
        {!isLoggedIn && (
          <>
            <small>Phongtro123.com</small>
            <Button
              text={"Sign in"}
              second
              small
              IcBefore={faUserPlus}
              onClick={() => login(false)}
            />

            <Button
              text={"Sign up"}
              onClick={() => login(true)}
              second
              small
              IcBefore={faRightToBracket}
            />
          </>
        )}

        {isLoggedIn && (
          <div className={cx("header__manage")}>
            <div className={cx("header__user")}>
              <img
                src="https://phongtro123.com/images/default-user.png"
                alt="avatar"
                className={cx("header__avatar")}
              />
              <Link>
                <div className={cx("header__info")}>
                  <small>
                    Xin chào,{" "}
                    <strong className={cx("header__name")}>
                      {userDetail.name}
                    </strong>
                  </small>
                  <small>
                    Mã tài khoản: <strong>1</strong>
                  </small>
                </div>
              </Link>
            </div>
            <Button
              text={"Quản lý tài khoản"}
              second
              small
              IcBefore={faUserPlus}
              onClick={() => setIsShowModal((prev) => !prev)}
            />
            {isShowModal && (
              <div className={cx("header__manage-modal")}>
                {menu.map((el) => (
                  <Link key={el.id} to={el.path}>
                    <span className={cx("header__manage-text")}>{el.text}</span>
                  </Link>
                ))}
                <span
                  className={cx("header__manage-text")}
                  onClick={() => {
                    dispatch(actions.logout());
                    setIsShowModal(false);
                  }}
                >
                  Đăng xuất
                </span>
              </div>
            )}
          </div>
        )}

        <Button
          text={"New post"}
          onClick={() => alert("clicked")}
          first
          large
          IcAfter={faCirclePlus}
        />
      </div>
    </header>
  );
};

export default Header;
