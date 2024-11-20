import React, { useEffect, useState } from "react";
import styles from "./CreatePost.module.scss";
import classNames from "classnames/bind";
import { Address, Loading, Overview } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  getAreaCodes,
  getPriceCodes,
  validate,
} from "../../../utils/common/common";
import {
  deleteImage,
  resetDataEdit
} from "../../../store/actions/post";
import { apiCreatePost, apiUpdatePost } from "../../../services";
import Swal from "sweetalert2";

const cx = classNames.bind(styles);

const CreatePost = ({ isEdit, setIsEdit }) => {
  const { prices } = useSelector((state) => state.prices);
  const { areas } = useSelector((state) => state.areas);
  const { userDetail } = useSelector((state) => state.user);
  const { dataEdit } = useSelector((state) => state.post);
  const [payload, setPayload] = useState(() => {
    const initData = {
      categoryCode: dataEdit?.category?.code || "",
      title: dataEdit?.title || "",
      // star: "",
      images: dataEdit?.images?.find((el) => el?.image) || null,
      priceNumber: dataEdit?.priceNumber * 1000000 || null,
      areaNumber: dataEdit?.areaNumber || null,
      priceCode: dataEdit?.price?.code || "",
      areaCode: dataEdit?.area?.code || "",
      address: dataEdit?.address || "",
      description: dataEdit?.description || "",
      provinceCode: dataEdit?.province?.code || "",
    };

    return initData;
  });
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formDataImage, setFormDataImage] = useState(new FormData());
  const [invalidFields, setInvalidFields] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataEdit) {
      let images = dataEdit?.images?.map((el) => el.image);
      images && setImagesPreview(images);
    }
  }, [dataEdit]);

  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    const files = e.target.files;
    let preview = [];
    const formData = new FormData();

    for (let i of files) {
      formData.append("files", i);
      preview.push({ file: i, url: URL.createObjectURL(i) });
    }

    setFormDataImage((prev) => {
      if (prev) {
        for (let value of formData.entries()) {
          prev.append(value[0], value[1]);
        }
        return prev;
      }
      return formData;
    });

    setImagesPreview((prev) => [...prev, ...preview]);
    setIsLoading(false);

    // setTimeout(() => {
    //   dispatch(uploadImages(formData, "116fbba4-0986-484d-8663-200ff0daba35"))
    // }, 2000)
  };

  const handleDeleteImage = (image) => {
    setImagesPreview((prev) => prev?.filter((el) => el?.url !== image?.url));

    if (dataEdit && imagesPreview) {
      setImagesPreview(imagesPreview?.filter((el) => el !== image));
    }

    const newFormData = new FormData();
    for (let [key, value] of formDataImage.entries()) {
      if (value !== image?.file) {
        newFormData.append(key, value);
      }
    }

    setFormDataImage(newFormData);
    dispatch(deleteImage({ image_url: image }));
  };

  const handleSubmit = async () => {
    let priceCodeArr = getPriceCodes(+payload.priceNumber, prices, 1, 15);
    let priceCode = priceCodeArr[0]?.code;

    let areaCodeArr = getAreaCodes(+payload.areaNumber, areas, 0, 90);
    let areaCode = areaCodeArr[0]?.code;

    let payloadObj = {
      ...payload,
      priceCode,
      areaCode,
      labelCode: `${payload.address.split(",")[0]}`,
      userId: userDetail?.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
    };
    const result = validate(payloadObj, setInvalidFields);
    if (result === 0) {
      const formData = new FormData();

      if (formDataImage) {
        for (let value of formDataImage.entries()) {
          formData.append(value[0], value[1]);
        }
      }

      Object.keys(payloadObj).forEach((key) => {
        formData.append(key, payloadObj[key]);
      });

      if (dataEdit?.id) {
        setIsLoading(true);
        const response = await apiUpdatePost(dataEdit?.id, formData);
        setIsEdit(false);
        if (response.data) {
          Swal.fire(
            "Thành công",
            "Đã chỉnh sửa bài đăng thành công",
            "success"
          ).then(() => {
            setPayload({
              categoryCode: "",
              title: "",
              images: "",
              priceNumber: "",
              areaNumber: "",
              priceCode: "",
              areaCode: "",
              address: "",
              description: "",
              provinceCode: "",
            });
            dispatch(resetDataEdit());
            // window.location.reload();
          });
        } else {
          Swal.fire("Thất bại!", "Lỗi", "error");
        }
      } else {
        setIsLoading(true);
        const response = await apiCreatePost(formData);
        setIsLoading(false);
        if (response.data) {
          Swal.fire({
            title: "Thành công",
            text: "Đã tạo mới bài đăng thành công",
            icon: "success",
            width: "450px",
            showConfirmButton: true,
            timer: 2000,
          })
            .then(() => {
              setPayload({
                categoryCode: "",
                title: "",
                // star: "",
                images: null,
                priceNumber: "",
                areaNumber: "",
                priceCode: "",
                areaCode: "",
                address: "",
                description: "",
                provinceCode: "",
              });
              dispatch(resetDataEdit());
            })
            .then(() => {
              window.location.reload();
            });
        } else {
          Swal.fire("Thất bại!", "Lỗi", "error");
        }
      }
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <div className={cx("post-create")}>
      <h1 className={cx("post-create__heading")}>
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className={cx("post-create__inner")}>
        <div className={cx("post-create__content")}>
          <Address
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Overview
            payload={payload}
            setPayload={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <div className={cx("post-create__picture")}>
            <h3 className={cx("post-create__header")}>Hình ảnh</h3>
            <small className={cx("post-create__text")}>
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className={cx("post-create__file")}>
              <label htmlFor="file" className={cx("post-create__label")}>
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <span className={cx("post-create__icon")}></span>
                    Thêm ảnh
                  </>
                )}
              </label>

              <input
                hidden
                type="file"
                id="file"
                multiple
                onChange={handleFiles}
                value=""
                className={cx("post-create__input")}
              />
              <div>
                <div className={cx("post-create__preview")}>
                  {imagesPreview?.map((item) => (
                    <div className={cx("post-create__action")}>
                      <img
                        key={item}
                        src={item?.url || item}
                        alt="preview"
                        className={cx("post-create__thumbnail")}
                      />
                      <span
                        className={cx("post-create__delete")}
                        onClick={() => handleDeleteImage(item)}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          className={cx("post-create__icon-delete")}
                        />
                        <span>Xóa</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            className={cx("post-create__btn")}
            onClick={() => handleSubmit()}
          >
            {isEdit ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>

        <div className={cx("post-create__map")}></div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default CreatePost;
