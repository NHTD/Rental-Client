import React, { memo } from "react";
import styles from "./Select.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Select = ({ label, options, value, setValue, type, name, invalidFields, setInvalidFields }) => {

  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find(el => el.name === name)
    let addressInvalid = invalidFields?.find(el => el.name === "address")

    return `${nameInvalid ? nameInvalid.message: ""}` || `${addressInvalid ? addressInvalid.message : ""}`
  }

  return (
    <div className={cx("select-address")}>
      <label htmlFor="address" className={cx("select-address__label")}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({...prev, [name]: e.target.value}))}
        id="address"
        className={cx("select-address__select")}
        onFocus={() => setInvalidFields([])}
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {options?.map((el) => (
          <option
            key={
              type === "province"
                ? el?.code
                : type === "district"
                ? el?.district_id
                : el.code
            }
            value={
              type === "province"
                ? el?.code
                : type === "district"
                ? el?.district_id
                : el.code
            }
          >
            {type === "province"
              ? el?.value
              : type === "district"
              ? el?.district_name
              : el.value}
          </option>
        ))}
      </select>
      {invalidFields && <small>{handleErrorText()}</small>}
    </div>
  );
};

export default memo(Select);
