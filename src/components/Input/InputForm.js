import React from "react";
import styles from "./InputForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const InputForm = ({ text, type, id, value, formik }) => {
  return (
    <div className={cx("input")}>
      <label htmlFor={id} className={cx("input__label")}>
        {text}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className={cx("input__control")}
        value={value}
        onChange={formik?.handleChange}
      />
      {formik?.errors[id] && (
        <p className={cx("input__error")}>{formik?.errors[id]}</p>
      )}
    </div>
  );
};

export default React.memo(InputForm);
