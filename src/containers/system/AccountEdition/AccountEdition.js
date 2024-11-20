import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./AccountEdition.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiUpdateUser } from "../../../services/user";
import Swal from "sweetalert2";
import { getUserDetail } from "../../../store/actions";
import { path } from "../../../utils/constant";
import { Loading } from "../../../components";
import ChangePassword from "../ChangePassword/ChangePassword";
import actionTypes from "../../../store/actions/actionTypes";

const cx = classNames.bind(styles);

const AccountEdition = () => {
  const navigate = useNavigate();

  const { userDetail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState("");
  const [payload, setPayload] = useState({
    id: userDetail?.id || "",
    phone: userDetail?.accountType || "",
    name: userDetail?.name || "",
    email: userDetail?.accountType || "",
    zalo: userDetail?.zalo || "",
    password: "",
    avatar: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      //  behavior: "smooth"
    });
  }, [userDetail?.password]);

  useEffect(() => {
    setPayload({
      id: userDetail?.id || "",
      phone: userDetail?.accountType || "",
      name: userDetail?.name || "",
      email: userDetail?.accountType || "",
      zalo: userDetail?.zalo || "",
      password: "",
      avatar: userDetail?.avatar || "",
    });
  }, [userDetail]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    file && setPreview(URL.createObjectURL(file));
    formData
      .entries()
      .forEach((el) => setPayload((prev) => ({ ...prev, [el[0]]: el[1] })));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(payload).forEach((el) => {
      formData.append(el[0], el[1]);
    });
    setIsLoading(true);
    const response = await apiUpdateUser(userDetail?.id, formData);
    setIsLoading(false);
    if (response.data) {
      if (payload.email !== userDetail?.email) {
        Swal.fire({
          title: "Thành công",
          text: "Đã cập nhật thông tin thành công. Bạn sẽ được chuyển đến trang đăng nhập.",
          icon: "success",
          width: "450px",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          dispatch({
            type: actionTypes.LOGOUT,
          });
          navigate(`/${path.LOGIN}`);
        });
      } else {
        Swal.fire({
          title: "Thành công",
          text: "Đã cập nhật thông tin thành công.",
          icon: "success",
          width: "450px",
          showConfirmButton: true,
          timer: 2000,
        })
          .then(() => dispatch(getUserDetail()))
          .then(() => window.location.reload());
      }
    } else {
      Swal.fire("Thất bại", "Cập nhật thất bại", "error");
    }
    window.scrollTo({ top: 0 });
  };

  return (
    <div className={cx("account-edition")}>
      <div className={cx("account-edition__row")}>
        <h1 className={cx("account-edition__heading")}>
          Cập nhật thông tin cá nhân
        </h1>
      </div>

      <div className={cx("account-edition__content")}>
        <div className={cx("account-edition__inner")}>
          <label htmlFor="title">Mã thành viên</label>
          <input
            type="text"
            id="title"
            readOnly
            className={cx("account-edition__input")}
            value={payload.id}
          />
        </div>
        <div className={cx("account-edition__inner")}>
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="phone"
            id="phone"
            className={cx("account-edition__input")}
            value={payload.accountType}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>
        <div className={cx("account-edition__inner")}>
          <label htmlFor="name">Tên hiển thị</label>
          <input
            name="name"
            type="text"
            id="name"
            className={cx("account-edition__input")}
            value={payload.name}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={cx("account-edition__inner")}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className={cx("account-edition__input")}
            value={payload.email}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className={cx("account-edition__inner")}>
          <label htmlFor="zalo">Số zalo</label>
          <input
            type="number"
            id="zalo"
            readOnly
            className={cx("account-edition__input")}
            value={payload.zalo}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, zalo: e.target.value }))
            }
            name="zalo"
          />
        </div>
        <div className={cx("account-edition__inner")}>
          <span>Mật khẩu</span>
          <span
            onClick={() => setIsVisible(true)}
            className={cx("account-edition__password")}
          >
            Thay đổi mật khẩu
          </span>
        </div>
        <div className={cx("account-edition__avatar")}>
          <label htmlFor="avatar">Ảnh đại diện</label>
          <div className={cx("account-edition__wrap")}>
            <img
              src={
                preview ||
                userDetail?.avatar ||
                "https://phongtro123.com/images/default-user.png"
              }
              alt="avatar"
              className={cx("account-edition__thumbnail")}
            />
            <div>
              {preview && (
                <button
                  className={cx("account-edition__thumbnail-delete")}
                  onClick={() => setPreview("")}
                >
                  Xóa hình này
                </button>
              )}
              <label
                htmlFor="avatar"
                className={cx("account-edition__thumbnail-change")}
              >
                Chọn ảnh
              </label>
              <input
                hidden
                type="file"
                id="avatar"
                className={cx("account-edition__thumbnail-input")}
                onChange={(e) => handleFile(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className={cx("account-edition__save")}
        onClick={() => handleSubmit()}
      >
        Lưu và cập nhật
      </button>
      {isLoading && <Loading />}

      {isVisible && (
        <ChangePassword isVisible={isVisible} setIsVisible={setIsVisible} />
      )}
    </div>
  );
};

export default AccountEdition;
