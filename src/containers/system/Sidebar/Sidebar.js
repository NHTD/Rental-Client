import React from "react";
import styles from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { menuSidebar } from "../../../utils/common/common";
import { NavLink } from "react-router-dom";
import { logout } from "../../../store/actions/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../../utils/icons";

const cx = classNames.bind(styles);

const { faRightToBracket } = icons;

const Sidebar = () => {
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state) => state.user);

  return (
    <div className={cx("system__sidebar")}>
      <div className={cx("system__sidebar-info")}>
        <div className={cx("system__sidebar-content")}>
          <img
            src="https://phongtro123.com/images/default-user.png"
            alt="avatar"
            className={cx("system__sidebar-avatar")}
          />
          <div className={cx("system__sidebar-inner")}>
            <span className={cx("system__sidebar-name")}>
              {userDetail?.name}
            </span>
            <span className={cx("system__sidebar-phone")}>
              {userDetail?.phone}
            </span>
          </div>
        </div>

        <div className={cx("system__sidebar-personal")}>
          <span>
            Mã thành viên:{" "}
            <small className={cx("system__sidebar-id")}>100000</small>
          </span>
          <span>
            TK Chính: <small className={cx("system__sidebar-balance")}>0</small>
          </span>
        </div>
      </div>

      <div className={cx("system__sidebar-menu")}>
        {menuSidebar?.map((el) => (
          <NavLink
            to={el?.path}
            key={el.id}
            className={({ isActive }) =>
              cx("system__sidebar-link", { active: isActive })
            }
          >
            <span className={cx("system__sidebar-icon")}>{el.icon}</span>
            <span className={cx("system__sidebar-text")}>{el.text}</span>
          </NavLink>
        ))}
        <div className={cx("system__sidebar-link")}>
          <span className={cx("system__sidebar-icon")}>
            <FontAwesomeIcon icon={faRightToBracket} />
          </span>
          <span
            onClick={() => dispatch(logout())}
            className={cx("system__sidebar-exit")}
          >
            Thoát
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
