import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button, InputForm, Loading } from "../../../components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { socialLogin, socialLoginCallback } from "../../../store/actions";
import { path } from "../../../utils/constant";
import { apiSignIn } from "../../../services/auth";
import actionTypes from "../../../store/actions/actionTypes";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  let code = params.get("code");

  const { url, isLoggedIn } = useSelector((state) => state.auth);
  window.open(url, "_self");

  const [loginType, setLoginType] = useState("");
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    isLoggedIn && navigate(`${path.HOME}`);
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      account_type: "",
      password: "",
    },
    validationSchema: Yup.object({
      account_type: Yup.string().required("Required").min(10),
      password: Yup.string()
        .min(3, "Must be larger 3 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      // dispatch(signIn(values));
      setIsLoading(true);
      try {
        const response = await apiSignIn(values);
        setIsLoading(false);
        if (response.status === 200) {
          Swal.fire({
            title: "Thành công",
            text: "Đăng nhập thành công",
            icon: "success",
            width: "500px",
            showConfirmButton: true,
            timer: 2000,
          }).then(() => {
            dispatch({
              type: actionTypes.SIGN_IN_SUCCESS,
              data: response.data.data.token,
            });
          });
        }
      } catch (error) {
        setIsLoading(false);
        const errorResponse = error.response?.data?.message || "Đã xảy ra lỗi";
        Swal.fire({
          title: "Lỗi",
          text: errorResponse,
          icon: "error",
          width: "500px",
          showConfirmButton: true,
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
    <div className={cx("login")}>
      <h3 className={cx("login__heading")}>Đăng nhập</h3>

      <form className={cx("login__inner")} onSubmit={formik.handleSubmit}>
        <InputForm
          text={"EMAIL"}
          type={"text"}
          id={"account_type"}
          name={"account_type"}
          value={formik.values.name}
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

        <Button type={"submit"} text={"Đăng nhập"} third />
      </form>

      <div className={cx("login__group")}>
        <Link
          to={`/${path.FORGOT_PASSWORD}`}
          className={cx("login__group-text")}
        >
          Bạn quên mật khẩu?
        </Link>
        <Link to={"/register"} className={cx("login__group-text")}>
          Tạo tài khoản mới
        </Link>
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

export default Login;
