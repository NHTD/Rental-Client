import React from "react";
import styles from "./Intro.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const { faStar } = icons;

const Intro = () => {
  return (
    <div className={cx("intro")}>
      <div className={cx("intro__inner")}>
        <h3 className={cx("intro__title")}>
          Tại sao lại chọn PhongTro123.com?
        </h3>
        <p className={cx("intro__desc")}>
          Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng Phongtro123.com tự hào
          là trang web đứng top google về các từ khóa: cho thuê phòng trọ, nhà
          trọ, thuê nhà nguyên căn, cho thuê căn hộ, tìm người ở ghép, cho thuê
          mặt bằng...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với
          nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn
        </p>
        <div className={cx("intro__row")}>
          <div className={cx("intro__row-inner")}>
            <span className={cx("intro__row-number")}>116.998+</span>
            <span className={cx("intro__row-text")}>Thành viên</span>
          </div>
          <div className={cx("intro__row-inner")}>
            <span className={cx("intro__row-number")}>103.348+</span>
            <span className={cx("intro__row-text")}>Tin đăng</span>
          </div>
          <div className={cx("intro__row-inner")}>
            <span className={cx("intro__row-number")}>300.000+</span>
            <span className={cx("intro__row-text")}>Lượt truy cập/tháng</span>
          </div>
          <div className={cx("intro__row-inner")}>
            <span className={cx("intro__row-number")}>2.500.000+</span>
            <span className={cx("intro__row-text")}>Lượt xem/tháng</span>
          </div>
        </div>
        <span className={cx("intro__title")}>
          Chi phí thấp, hiệu quả tối đa
        </span>
        <div className={cx("intro__stars")}>
          <FontAwesomeIcon icon={faStar} className={cx("intro__icon")} />
          <FontAwesomeIcon icon={faStar} className={cx("intro__icon")} />
          <FontAwesomeIcon icon={faStar} className={cx("intro__icon")} />
          <FontAwesomeIcon icon={faStar} className={cx("intro__icon")} />
          <FontAwesomeIcon icon={faStar} className={cx("intro__icon")} />
        </div>
        <p className={cx("intro__sub-title")}>
          "Trước khi biết website phongtro123, mình phải tốn nhiều công sức và
          chi phí cho việc đăng tin cho thuê: từ việc phát tờ rơi, dán giấy, và
          đăng lên các website khác nhưng hiệu quả không cao. Từ khi biết
          website phongtro123.com, mình đã thử đăng tin lên và đánh giá hiệu quả
          khá cao trong khi chi phí khá thấp, không còn tình trạng phòng trống
          kéo dài."
        </p>
        <span className={cx("intro__info")}>
          Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)
        </span>
        <span className={cx("intro__title")}>
          Bạn đang có phòng trọ / căn hộ cho thuê?
        </span>
        <span className={cx("intro__text")}>
          Không phải lo tìm người cho thuê, phòng trống kéo dài
        </span>
        <Button large first text={"Đăng tin ngay"} />
      </div>
    </div>
  );
};

export default Intro;
