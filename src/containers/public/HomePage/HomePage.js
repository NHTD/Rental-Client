import React, { useEffect } from "react";
import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";
import { ItemSidebar, Province, RelatedPost } from "../../../components";
import { ListItem, Pagination } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getAreas, getCategories, getPrices } from "../../../store/actions";

const cx = classNames.bind(styles);

const HomePage = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);
  const { prices } = useSelector((state) => state.prices);
  const { areas } = useSelector((state) => state.areas);
  
  return (
    <div className={cx("home-page")}>
      <div>
        <h1 className={cx("text-heading")}>Tìm kiếm chỗ thuê ưng ý</h1>
        <p className={cx("text-desc")}>
          Kênh thông tin Phòng trọ số 1 Việt Nam - Website đăng tin cho thuê
          phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+
          tin đăng và 2.500.000 lượt xem mỗi tháng.
        </p>
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

export default HomePage;
