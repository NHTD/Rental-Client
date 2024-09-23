import React, { useState } from "react";
import styles from "./CreatePost.module.scss";
import classNames from "classnames/bind";
import { Address, Loading, Overview } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getAreaCodes, getPriceCodes, validate } from "../../../utils/common/common";

const cx = classNames.bind(styles);

const CreatePost = () => {

  const {prices} = useSelector(state => state.prices)
  const {areas} = useSelector(state => state.areas)
  const { userDetail } = useSelector((state) => state.user);

  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    // star: "",
    priceNumber: 0,
    areaNumber: 0,
    address: "",
    description: "",
    // provinceCode: "",
  });

  const [imagesPreview, setImagesPreview] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formDataImage, setFormDataImage] = useState()
  const [invalidFields, setInvalidFields] = useState([])

  const dispatch = useDispatch();

  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    const files = e.target.files;
    let preview = [];
    const formData = new FormData();
    
    for (let i of files) {
      formData.append("files", i);
      preview.push(URL.createObjectURL(i));
    } 

    setFormDataImage(prev => {
      if (prev) {
        for (let value of formData.entries()) {
          prev.append(value[0], value[1]);
        }
        return prev;
      }
      return formData;
    });

    setImagesPreview(prev => [...prev, preview])
    setIsLoading(false)

    // setTimeout(() => {
    //   dispatch(uploadImages(formData, "116fbba4-0986-484d-8663-200ff0daba35"))
    // }, 2000)
  }
  // console.log(formDataImage)

  const handleDeleteImage = (item) => {
    setImagesPreview(prev => prev?.filter(el => el!==item))
  }

  const handleSubmit = () => {
    let priceCodeArr = getPriceCodes(+payload.priceNumber, prices, 1, 15)
    let priceCode = priceCodeArr[0]?.code

    let areaCodeArr = getAreaCodes(+payload.areaNumber, areas, 0, 90)
    let areaCode = areaCodeArr[0]?.code
    
    let payloadObj = {
      ...payload,
      priceCode,
      areaCode,
      labelCode: `${payload.address.split(",")[0]}`,
      userId: userDetail?.id
    }
    const result = validate(payloadObj, setInvalidFields)

    if(result===0){
      const formData = new FormData();

      if (formDataImage) {
        for (let value of formDataImage.entries()) {
          formData.append(value[0], value[1]);
        }
      }

    
      Object.keys(payloadObj).forEach((key) => {
        formData.append(key, payloadObj[key]);
      });

      // for(let i of formData.entries()){
      //   console.log(i)
      // }
    
      // dispatch(createPost(formData));
    }
  }

  return (
    <div className={cx("post-create")}>
      <h1 className={cx("post-create__heading")}>Đăng tin mới</h1>
      <div className={cx("post-create__inner")}>
        <div className={cx("post-create__content")}>
          <Address payload={payload} setPayload={setPayload} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />
          <Overview payload={payload} setPayload={setPayload} invalidFields={invalidFields} setInvalidFields={setInvalidFields} />

          <div className={cx("post-create__picture")}>
            <h3 className={cx("post-create__header")}>Hình ảnh</h3>
            <small className={cx("post-create__text")}>
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className={cx("post-create__file")}>
              <label htmlFor="file" className={cx("post-create__label")}>
                {isLoading 
                ? <Loading /> 
                : (
                <>
                  <span className={cx("post-create__icon")}></span>
                  Thêm ảnh
                </>
                )
                }
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
                  {imagesPreview?.map(item => (
                    <div className={cx("post-create__action")}>
                      <img key={item} src={item} alt="preview" className={cx("post-create__thumbnail")}/>
                      <span className={cx("post-create__delete")} onClick={() => handleDeleteImage(item)}>
                        <FontAwesomeIcon icon={faTrash} className={cx("post-create__icon-delete")}/>
                        <span>Xóa</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={cx("post-create__video")}>
            <h3 className={cx("post-create__header")}>Video</h3>
            <small className={cx("post-create__text")}>
              Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
            </small>
            <div className={cx("post-create__file")}>
              <label htmlFor="file" className={cx("post-create__label")}>
                <span className={cx("post-create__vid")}></span>
                Thêm video
              </label>

              <input
                hidden
                type="file"
                id="file"
                className={cx("post-create__input")}
              />
            </div>
          </div>

          <button className={cx("post-create__btn")} onClick={() => handleSubmit()}>Submit</button>
        </div>

        <div className={cx("post-create__map")}>map</div>
      </div>
    </div>
  );
};

export default CreatePost;
