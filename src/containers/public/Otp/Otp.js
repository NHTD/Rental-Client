import React, { useState } from "react";
import styles from "./Otp.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { path } from "../../../utils/constant";
import { apiVerifyOtp } from "../../../services/user";
import { Loading } from "../../../components";

const cx = classNames.bind(styles);

const Otp = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const accountType = params["accountType"];

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const response = await apiVerifyOtp(payload, accountType);
      setIsLoading(false);
      if (response.status === 200) {
        Swal.fire({
          title: "Đăng ký thành công",
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
          text: "Mã otp không chính xác, vui lòng đăng ký lại",
          icon: "error",
          width: "450px",
          showConfirmButton: true,
          timer: 2000,
        }).then(() => {
          navigate(`/${path.REGISTER}`);
        });
      }
    } catch (error) {
      const errorResponse = error?.response?.data?.message;
      setIsLoading(false);
      if (errorResponse) {
        Swal.fire({
          title: "Thất bại",
          text: errorResponse,
          icon: "error",
          width: "450px",
          showConfirmButton: true,
          timer: 2000,
        }).then(() => {
          navigate(`/${path.REGISTER}`);
        });
      }
    }
  };

  return (
    <div className={cx("otp")}>
      <span className={cx("otp__text")}>Xác thực otp</span>
      <div className={cx("otp__content")}>
        <div className={cx("otp__inner")}>
          <label htmlFor="otp" className={cx("otp__label")}>
            Nhập mã otp
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={payload.otp}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, otp: e.target.value }))
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
      {isLoading && <Loading />}
    </div>
  );
};

export default Otp;
