import React from "react";
import styles from "./Contact.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Contact = () => {
  return (
    <div className={cx("contact")}>
      <h2 className={cx("contact__heading")}>Liên hệ với chúng tôi</h2>
      <div className={cx("contact__content")}>
        <div className={cx("contact__info")}>
          <span className={cx("contact__info-title")}>Thông tin liên hệ</span>

          <div className={cx("contact__info-desc")}>
            <span>
              Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã
              lựa chọn PhongTro123.Com
            </span>

            <span>
              <strong className={cx("contact__info-strong")}>
                Điện thoại:{" "}
              </strong>
              0917 686 101
            </span>

            <span>
              <strong className={cx("contact__info-strong")}>Email: </strong>
              cskh.phongtro123@gmail.com
            </span>

            <span>
              <strong className={cx("contact__info-strong")}>Zalo: </strong>
              0917 686 101
            </span>

            <span>
              <strong className={cx("contact__info-strong")}>Viber: </strong>
              0917 686 101
            </span>

            <span>
              <strong className={cx("contact__info-strong")}>Địa chỉ: </strong>
              Căn 02.34, Lầu 2, Tháp 3, The Sun Avenue, Số 28 Mai Chí Thọ,
              Phường An Phú, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam.
            </span>
          </div>
        </div>

        <div className={cx("contact__form")}>
          <span className={cx("contact__form-title")}>Liên hệ trực tuyến</span>

          <div className={cx("contact__form-wrapper")}>
            <label htmlFor="fullName" className={cx("contact__form-label")}>
              Họ tên của bạn
            </label>
            <input
              id="fullName"
              name="fullName"
              className={cx("contact__form-input")}
            />
          </div>

          <div className={cx("contact__form-wrapper")}>
            <label htmlFor="phone" className={cx("contact__form-label")}>
              Số điện thoại
            </label>
            <input
              id="phone"
              name="phone"
              className={cx("contact__form-input")}
            />
          </div>

          <div className={cx("contact__form-wrapper")}>
            <label htmlFor="content" className={cx("contact__form-label")}>
              Nội dung
            </label>
            <textarea
              id="content"
              rows="10"
              cols="40"
              className={cx("contact__form-textarea")}
            />
          </div>

          <button className={cx("contact__button")}>Gửi liên hệ</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Contact;
