import React, { memo, useState } from "react";
import styles from "./Overview.module.scss";
import classNames from "classnames/bind";
import Select from "../Select/Select";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const genders = [
  {
    id: 1,
    value: "Nam",
  },
  {
    id: 2,
    value: "Nữ",
  },
];

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { category } = useSelector((state) => state.category);
  const { userDetail } = useSelector((state) => state.user);
  // const [categories, setCategories] = useState();

  return (
    <div className={cx("overview")}>
      <h2 className={cx("overview__title")}>Thông tin mô tả</h2>
      <div className={cx("overview__select")}>
        <Select
          label={"Loại chuyên mục"}
          name={"categoryCode"}
          options={category}
          value={payload.categoryCode}
          setValue={setPayload}
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
          type={"category"}
        />
      </div>
      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Tiêu đề
        </label>
        <input 
          type="text" 
          id="title" 
          className={cx("overview__input")} 
          value={payload.title}
          onChange={(e) => setPayload(prev => ({...prev, title: e.target.value}))}
          onFocus={() => setInvalidFields([])}
        />
      </div>

      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Nội dung mô tả
        </label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          className={cx("overview__textarea")}
          value={payload.description}
          onChange={(e) => setPayload(prev => ({...prev, description: e.target.value}))}
          onFocus={() => setInvalidFields([])}
        ></textarea>

        {invalidFields?.some(el => el.name === "description") && invalidFields?.find(el => el.name === "description")?.message}
      </div>

      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Thông tin liên hệ
        </label>
        <input
          type="text"
          id="title"
          className={cx("overview__readonly")}
          value={userDetail?.name}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Điện thoại
        </label>
        <input
          type="text"
          id="title"
          className={cx("overview__readonly")}
          value={userDetail?.phone}
          readOnly
        />
        {invalidFields?.some(el => el.name === "title") && invalidFields?.find(el => el.name === "title")?.message}
      </div>

      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Giá cho thuê
        </label>
        <div className={cx("overview__row")}>
          <input 
            type="text" 
            id="priceNumber" 
            className={cx("overview__input")} 
            value={payload.priceNumber}
            onChange={(e) => setPayload(prev => ({...prev, priceNumber: e.target.value}))}
            onFocus={() => setInvalidFields([])}
          />
          <span className={cx("overview__text")}>đồng</span>
        </div>
        <small>
          {invalidFields?.some(el => el.name === "priceNumber") && invalidFields?.find(el => el.name === "priceNumber")?.message}
        </small>
      </div>

      <div>
        <label htmlFor="title" className={cx("overview__label")}>
          Diện tích
        </label>
        <div className={cx("overview__row")}>
          <input 
            type="text" 
            id="areaNumber" 
            className={cx("overview__input")} 
            value={payload.areaNumber}
            onChange={(e) => setPayload(prev => ({...prev, areaNumber: e.target.value}))}
            onFocus={() => setInvalidFields([])}
          />
          <span className={cx("overview__text")}>m2</span>
        </div>
        {invalidFields?.some(el => el.name === "areaNumber") && invalidFields?.find(el => el.name === "areaNumber")?.message}

        {/* <div className={cx("overview__select")}>
          <Select options={genders} label={"Đối tượng cho thuê"} setValue={setPayload} value={payload.gender} name={"gender"}/>
        </div> */}
      </div>
    </div>
  );
};

export default memo(Overview);
