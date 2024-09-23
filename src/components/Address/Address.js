import React, { memo, useEffect, useState } from "react";
import styles from "./Address.module.scss";
import classNames from "classnames/bind";
import Select from "../Select/Select";
import { apiGetDistrictsPublic } from "../../services";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Address = ({ setPayload, invalidFields, setInvalidFields }) => {
  // const [provinces, setProvinces] = useState([]);
  const { provinces } = useSelector(state => state.provinces)
  
  const [districts, setDistricts] = useState([]);
  // const [reset, setReset] = useState(false)
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetDistrictsPublic(province);
      if (response.status === 200) {
        setDistricts(response?.data.results);
      }
    };

    province && fetchPublicDistrict();
    // !province ? setReset(true) : setReset(false)
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      address: `${district ? `${districts?.find((el) => el.district_id === district)?.district_name}, ` : ``}${province ? `${provinces?.find((el) => el.code === province)?.value}` : ``}`,
      provinceCode: province ? `${provinces?.find((el) => el?.code === province)?.code}` : ``
    }));
  }, [province, district]);

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
            value={`${
              district
                ? `${
                    districts?.find((el) => el.district_id === district)
                      ?.district_name
                  }, `
                : ``
            }${
              province
                ? `${
                    provinces?.find((el) => el.code === province)
                      ?.value
                  }`
                : ``
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Address);
