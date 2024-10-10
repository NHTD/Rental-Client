import React, { useEffect, useState } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { Button, InputForm, Loading } from "../../../components";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { socialLogin, socialLoginCallback } from "../../../store/actions";
import { path } from "../../../utils/constant";
import { apiRegister } from "../../../services/auth";
import actionTypes from "../../../store/actions/actionTypes";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState();
  let code = params.get("code");

  const { url } = useSelector((state) => state.auth);
  window.open(url, "_self");

  const [loginType, setLoginType] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      accountType: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      accountType: Yup.string().required("Required"),
      password: Yup.string()
        .min(3, "Must be larger 3 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      // dispatch(register(values));
      setIsLoading(true);
      try {
        const response = await apiRegister(values);
        setIsLoading(false);
        if (response.data) {
          Swal.fire({
            title: "Thành công",
            text: "Vui lòng vào gmail của bạn để lấy mã xác thực",
            icon: "success",
            width: "500px",
            showConfirmButton: true,
          }).then(() => {
            dispatch({
              type: actionTypes.REGISTER_SUCCESS,
              data: response.data,
            });
            formik.resetForm();
          });
        } else {
          Swal.fire({
            title: "Thất bại",
            text: "Đăng ký thất bại",
            icon: "error",
            width: "500px",
            showConfirmButton: true,
          }).then(() => {
            dispatch({
              type: actionTypes.REGISTER_FAIL,
              data: null,
            });
          });
        }
      } catch (error) {
        const errorResponse = error?.response?.data?.message;
        setIsLoading(false);
        Swal.fire({
          title: "Thất bại",
          text: "Đăng ký thất bại",
          icon: "error",
          width: "500px",
          showConfirmButton: true,
          timer: 2000,
        }).then(() => {
          dispatch({
            type: actionTypes.REGISTER_FAIL,
            data: errorResponse,
          });
        });
      }
    },
  });

  const handleLoginSocial = (type) => {
    setLoginType(type);
    dispatch(socialLogin({ login_type: type }));
  };

  useEffect(() => {
    if (code && code.length === 73) {
      dispatch(socialLoginCallback({ code: code, login_type: "google" }));
      navigate(path.HOME);
    }
    if (code && code.length === 387) {
      dispatch(socialLoginCallback({ code: code, login_type: "facebook" }));
    }
  }, [code, loginType]);
  return (
    <div className={cx("register")}>
      <h3 className={cx("register__heading")}>Tạo tài khoản mới</h3>

      <form className={cx("register__inner")} onSubmit={formik.handleSubmit}>
        <InputForm
          text={"Họ tên"}
          type={"text"}
          id={"name"}
          name={"name"}
          value={formik.values.name}
          formik={formik}
        />
        <InputForm
          text={"SỐ ĐIỆN THOẠI/EMAIL"}
          type={"text"}
          id={"accountType"}
          name={"accountType"}
          value={formik.values.accountType}
          formik={formik}
        />
        <InputForm
          text={"MẬT KHẨU"}
          type={"password"}
          id={"password"}
          name={"password"}
          value={formik.values.password}
          formik={formik}
        />

        <Button type={"submit"} text={"Tạo tài khoản"} third />
      </form>

      <div className={cx("register__group")}>
        <span className={cx("register__group-text")}>
          Bấm vào nút đăng ký tức là bạn đã đồng ý với{" "}
          <span className={cx("register__group-strong")}>
            {" "}
            quy định sử dụng
          </span>{" "}
          của chúng tôi
        </span>
        <span>
          Bạn đã có tài khoản?{" "}
          <Link to={"/login"} className={cx("register__group-strong")}>
            Đăng nhập ngay
          </Link>
        </span>
      </div>
      <div className={cx("social-login")}>
        <div
          className={cx("social-login__inner-google")}
          onClick={() => handleLoginSocial("facebook")}
        >
          <span>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
              }
              alt="google"
              className={cx("social-login__icon")}
            />
          </span>
          <span className={cx("social-login__facebook")}>
            Continue with Facebook
          </span>
        </div>
        <div
          className={cx("social-login__inner-facebook")}
          onClick={() => handleLoginSocial("google")}
        >
          <span className={cx("social-login__icon")}>
            <img
              src={
                "https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
              }
              alt="google"
              className={cx("social-login__icon")}
            />
          </span>
          <span className={cx("social-login__google")}>
            Continue with Google
          </span>
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default Register;
