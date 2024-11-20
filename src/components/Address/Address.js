import React, { memo, useEffect, useState } from "react";
import styles from "./Address.module.scss";
import classNames from "classnames/bind";
import Select from "../Select/Select";
import { useSelector } from "react-redux";
import { apiGetDistrictsByProvinceCode } from "../../services/district";

const cx = classNames.bind(styles);

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  // const [provinces, setProvinces] = useState([]);
  const { provinces } = useSelector(state => state.provinces)
  const { dataEdit } = useSelector(state => state.post)
  
  // const [reset, setReset] = useState(false)
  const [districts, setDistricts] = useState([])
  
  const [province, setProvince] = useState(() => {
    let provinceCode = dataEdit ? dataEdit?.province?.code : ""
    return provinceCode
  });
  const [district, setDistrict] = useState(() => {
    let districtName = dataEdit ? dataEdit?.address?.split(",")[0].trim() : ""

    return dataEdit?.province?.districts?.find(el => el.districtName === districtName)?.id
  });
  
  // console.log(districts?.find(el => el?.districtName === dataEdit?.address?.split(",")[0].trim())?.id)
  // console.log(dataEdit?.province?.districts?.find(el => el.districtName === dataEdit?.address?.split(",")[0].trim())?.id)

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetDistrictsByProvinceCode(province)
      if(response.data) {
        setDistricts(response.data);
      }
    };

    province && fetchPublicDistrict()

    !province && setDistricts([])
  }, [province]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${district ? `${districts?.find((el) => el.id === +district)?.districtName}, ` : ``}${province ? `${provinces?.find((el) => el.code === province)?.value}` : ``}`,
      // address: `${province ? `${provinces?.find((el) => el.code === province)?.value}` : ``}`,
      provinceCode: province ? `${provinces?.find((el) => el?.code === province)?.code}` : ``
    }));
  }, [province, district, dataEdit, districts, setPayload, provinces]);

  return (
    <div className={cx("address")}>
      <h2 className={cx("address__heading")}>Địa chỉ cho thuê</h2>
      <div className={cx("address__inner")}>
        <div className={cx("address__content")}>
          <Select
            value={province}
            setValue={setProvince}
            options={provinces}
            label="Tỉnh/Thành phố"
            type={"province"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            value={district}
            setValue={setDistrict}
            options={districts}
            label="Quận/Huyện"
            type={"district"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            // reset={reset}
          />
        </div>
        <div>
          <span className={cx("address__text")}>Địa chỉ chính xác</span>
          <input
            type="text"
            readOnly
            className={cx("address__input")}
            value={`${district ? `${districts?.find((el) => el.id === +district)?.districtName}, ` : ``
            }${
              province ? `${provinces?.find((el) => el.code === province)?.value}` : ``
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Address);
