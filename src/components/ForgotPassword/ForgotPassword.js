import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { apiVerifyAccount } from "../../services/auth";

const cx = classNames.bind(styles);

const ForgotPassword = () => {
  const [payload, setPayload] = useState({
    accountType: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyAccount = async () => {
    setIsLoading(true);
    const response = await apiVerifyAccount(payload);
    setIsLoading(false);
    if (response.status === 200) {
      Swal.fire({
        title: "Thành công",
        icon: "success",
        width: "450px",
        showConfirmButton: true,
        timer: 2000,
      }).then(() => setPayload(""));
    }
    if (response.status === 400) {
      Swal.fire({
        title: "Thất bại",
        text: "Email không tồn tại",
        icon: "error",
        width: "450px",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  return (
    <div className={cx("forgot-password")}>
      <span className={cx("forgot-password__text")}>Quên mật khẩu</span>
      <div className={cx("forgot-password__content")}>
        <span className={cx("forgot-password__desc")}>
          Vui lòng nhập số điện thoại/email liên kết với tài khoản của bạn để
          nhận mã đặt lại mật khẩu
        </span>

        <div className={cx("forgot-password__inner")}>
          <label htmlFor="email" className={cx("forgot-password__label")}>
            EMAIL
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={payload.accountType}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, accountType: e.target.value }))
            }
            className={cx("forgot-password__input")}
          />
        </div>

        <button
          className={cx("forgot-password__btn")}
          onClick={() => handleVerifyAccount()}
        >
          Tiếp tục
        </button>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default ForgotPassword;
