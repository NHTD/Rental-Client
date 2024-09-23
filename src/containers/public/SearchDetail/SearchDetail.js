import React, { useEffect, useState } from "react";
import { ItemSidebar, Province, RelatedPost } from "../../../components";
import ListItem from "../ListItem/ListItem";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import styles from "./SearchDetail.module.scss";
import classNames from "classnames/bind";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const SearchDetail = () => {
  const { category } = useSelector((state) => state.category);
  const { prices } = useSelector((state) => state.prices);
  const { areas } = useSelector((state) => state.areas);

  const location = useLocation()

  return (
    <div className={cx("home-page")}>
      <div>
        <h1 className={cx("text-heading")}>{location.state?.titleSearch || "Kết quả tìm kiếm"}</h1>
        <p className={cx("text-desc")}>{`${location.state?.titleSearch || "" }`}</p>
      </div>
      <Province />
      <div className={cx("content")}>
        <div className={cx("list-items")}>
          <ListItem />
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

export default SearchDetail;
