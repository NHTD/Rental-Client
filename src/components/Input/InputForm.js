import React from "react";
import styles from "./InputForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const InputForm = ({ label, name, type, formik, value }) => {
  return (
    <div className={cx("form-content")}>
      <label htmlFor={name} className={cx("form-name")}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className={cx("form-control")}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched[name] && formik.errors[name] ? (
        <div className={cx("error")}>{formik.errors[name]}</div>
      ) : null}
    </div>
  );
};

export default React.memo(InputForm);
