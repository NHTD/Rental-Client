import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ChangePasswordV2.module.scss";
import Swal from "sweetalert2";
import { apiChangePassword } from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "../../utils/constant";

const cx = classNames.bind(styles);

const ChangePasswordV2 = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const param = useParams();
  const accountType = param["accountType"];

  const handleChangePassword = async () => {
    const response = await apiChangePassword(accountType, payload);
    if (response.status === 200) {
      Swal.fire({
        title: "Thành công",
        icon: "success",
        width: "450px",
        showConfirmButton: true,
        timer: 2000,
      })
        .then(() => setPayload(""))
        .then(() => navigate(`/${path.LOGIN}`));
    } else {
      Swal.fire({
        title: "Thất bại",
        text: "Thay đổi mật khẩu thành công",
        icon: "error",
        width: "450px",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  return (
    <div className={cx("otp")}>
      <span className={cx("otp__text")}>Xác thực otp</span>
      <div className={cx("otp__content")}>
        <span className={cx("otp__desc")}>Vui nhập mật khẩu</span>

        <div className={cx("otp__inner")}>
          <label htmlFor="otp" className={cx("otp__label")}>
            Mật khẩu cũ
          </label>
          <input
            type="text"
            id="oldPassword"
            name="oldPassword"
            value={payload.oldPassword}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, oldPassword: e.target.value }))
            }
            className={cx("otp__input")}
          />
        </div>

        <div className={cx("otp__inner")}>
          <label htmlFor="newPassword" className={cx("otp__label")}>
            Mật khẩu mới
          </label>
          <input
            type="text"
            id="newPassword"
            name="newPassword"
            value={payload.newPassword}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            className={cx("otp__input")}
          />
        </div>

        <button
          className={cx("otp__btn")}
          onClick={() => handleChangePassword()}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default ChangePasswordV2;
