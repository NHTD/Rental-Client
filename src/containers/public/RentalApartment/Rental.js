import React, { useEffect, useState } from "react";
import { ItemSidebar, Province, RelatedPost } from "../../../components";
import ListItem from "../ListItem/ListItem";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import styles from "./Rental.module.scss";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";
import { formatVietnameseToString } from "../../../utils/common/common";

const cx = classNames.bind(styles);

const Rental = () => {
  const { category } = useSelector((state) => state.category);
  const { prices } = useSelector((state) => state.prices);
  const { areas } = useSelector((state) => state.areas);
  const [categoryCode, setCategoryCode] = useState("");
  const [categoryCurrent, setCategoryCurrent] = useState("");

  const location = useLocation();

  useEffect(() => {
    const getCategory = category?.find(
      (el) => `/${formatVietnameseToString(el.value)}` === location.pathname
    );
    setCategoryCurrent(getCategory);
    if (getCategory) {
      setCategoryCode(getCategory.code);
    }
  }, [location, category]);

  return (
    <div className={cx("home-page")}>
      <div>
        <h1 className={cx("text-heading")}>{categoryCurrent?.header}</h1>
        <p className={cx("text-desc")}>{categoryCurrent?.sub_header}</p>
      </div>
      <Province />
      <div className={cx("content")}>
        <div className={cx("list-items")}>
          <ListItem categoryCode={categoryCode} />
          <Pagination />
        </div>
        <div className={cx("sidebar")}>
          <ItemSidebar
            title={"Danh mục cho thuê"}
            content={category}
            isDouble={false}
          />
          <ItemSidebar
            title={"Xem theo giá"}
            content={prices}
            isDouble={true}
            type="priceCode"
          />
          <ItemSidebar
            title={"Xem theo diện tích"}
            isDouble={true}
            type="areaCode"
            content={areas}
          />

          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Rental;
