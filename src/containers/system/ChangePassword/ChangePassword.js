import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
import { apiChangePassword } from "../../../services/auth";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const ChangePassword = ({ setIsVisible }) => {
  const { userDetail } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = async () => {
    const response = await apiChangePassword(userDetail?.accountType, payload);
    if (response.status === 200) {
      Swal.fire("Thành công", "Đôi mật khẩu thành công", "success");
    } else if (response.status === 401) {
      Swal.fire("Thất bại", "Đôi mật khẩu thất bại", "error");
    }
  };

  return (
    <div
      className={cx("change-password")}
      onClick={(e) => {
        e.stopPropagation();
        setIsVisible(false);
      }}
    >
      <div
        className={cx("change-password__wrapper")}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={cx("change-password__row")}>
          <h1 className={cx("change-password__heading")}>Đổi mật khẩu</h1>
        </div>
        <div className={cx("change-password__content")}>
          <div className={cx("change-password__inner")}>
            <label className={cx("change-password__label")}>Mật khẩu cũ</label>
            <input
              type="text"
              className={cx("change-password__input")}
              value={payload.oldPassword}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, oldPassword: e.target.value }))
              }
            />
          </div>
          <div className={cx("change-password__inner")}>
            <label className={cx("change-password__label")}>Mật khẩu mới</label>
            <input
              type="text"
              className={cx("change-password__input")}
              value={payload.newPassword}
              onChange={(e) =>
                setPayload((prev) => ({ ...prev, newPassword: e.target.value }))
              }
            />
          </div>
          <button
            className={cx("change-password__btn")}
            onClick={() => handleChangePassword()}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
