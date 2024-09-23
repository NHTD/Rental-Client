import React, { useCallback, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { Button, InputForm } from "../../../components";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { path } from "../../../utils/constant";
import localStorage from "redux-persist/es/storage";

const cx = classNames.bind(styles);

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth);
  const [params] = useSearchParams()
  let code = params.get("code")
  
  const { url } = useSelector((state) => state.auth);
  window.open(url, "_self")   

  const [isRegister, setRegister] = useState(location.state?.flag);
  const [loginType, setLoginType] = useState("")

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().when("isRegister", {
        is: true,
        then: Yup.string().required("Required"),
      }),
      phone: Yup.string()
        .min(2, "Too short")
        .max(50, "Too Long!")
        .required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (isRegister) {
        dispatch(actions.register(values));
      } else {
        dispatch(actions.signIn(values));
      }
    },
  });

  useEffect(() => {
    if (location.state?.flag !== undefined) {
      setRegister(location.state.flag);
    }
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate(path.HOME);
  }, [isLoggedIn]);

  const handleLoginSocial = (type) => {
    setLoginType(type)
    dispatch(actions.socialLogin({ login_type: type }));
  };

  useEffect(() => { 
    if (code && code.length===73) {
      dispatch(actions.socialLoginCallback({ code: code, login_type: "google" }));
      navigate(path.HOME)
    }
    if (code && code.length===387) {
      dispatch(actions.socialLoginCallback({ code: code, login_type: "facebook" }));
    }
  }, [code, loginType]);

  return (
    <div className={cx("login")}>
      <h3 className={cx("content")}>{isRegister ? "Sign up" : "Sign in"}</h3>

      <form onSubmit={formik.handleSubmit} className={cx("form")}>
        {isRegister && (
          <InputForm
            label="YOUR NAME"
            name="name"
            id="name"
            type="text"
            value={formik.values.name}
            formik={formik}
          />
        )}
        <InputForm
          label="PHONE NUMBER"
          name="phone"
          id="phone"
          type="text"
          value={formik.values.phone}
          formik={formik}
        />
        <InputForm
          label="PASSWORD"
          name="password"
          id="password"
          type="password"
          value={formik.values.password}
          formik={formik}
        />
        <Button type="submit" text={isRegister ? "Sign up" : "Sign in"} third />
      </form>

      <div className={cx("row")}>
        {isRegister ? (
          <small>
            You have had account?{" "}
            <span
              className={cx("row-text")}
              onClick={() => {
                setRegister(false);
                formik.resetForm({
                  name: "",
                  phone: "",
                  password: "",
                });
              }}
            >
              Please login
            </span>
          </small>
        ) : (
          <>
            <span className={cx("text-forgot")}>Forgot password ?</span>
            <span
              onClick={() => setRegister(true)}
              className={cx("text-create")}
            >
              Create new account
            </span>
          </>
        )}
      </div>
      <div className={cx("social-login")}>
        <div className={cx("social-login__inner-google")} onClick={() => handleLoginSocial("facebook")}>
          <span>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"} alt="google" className={cx("social-login__icon")}/>
          </span>
          <span className={cx("social-login__facebook")}>Continue with Facebook</span>
        </div>
        <div className={cx("social-login__inner-facebook")} onClick={() => handleLoginSocial("google")}>
          <span className={cx("social-login__icon")}>
          <img src={"https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"} alt="google" className={cx("social-login__icon")}/>
          </span>
          <span className={cx("social-login__google")}>Continue with Google</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
