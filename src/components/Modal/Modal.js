import React, { memo, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getNumberAreas, getNumberPrices } from "../../utils/common/common";

const cx = classNames.bind(styles);

const { faArrowLeft } = icons;

const Modal = ({
  setIsShowModal,
  contents,
  name,
  queries,
  handleSubmit,
  arrMinMax,
  defaultText,
}) => {
  const [rangeMin, setRangeMin] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[0]
      : 0
  );

  const [rangeMax, setRangeMax] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
      ? arrMinMax?.areaArr[1]
      : 100
  );
  const [activedEl, setActivedEl] = useState("");

  useEffect(() => {
    const activedTrackEl = document.getElementById("track-active");
    if (activedTrackEl) {
      if (rangeMax <= rangeMin) {
        activedTrackEl.style.left = `${rangeMax}%`;
        activedTrackEl.style.right = `${100 - rangeMin}%`;
      } else {
        activedTrackEl.style.left = `${rangeMin}%`;
        activedTrackEl.style.right = `${100 - rangeMax}%`;
      }
    }
  }, [rangeMin, rangeMax]);

  const handleClickStrack = (e, value) => {
    e.stopPropagation();
    const strackEl = document.querySelector("#track");
    const strackRect = strackEl.getBoundingClientRect();

    let percent = value
      ? value
      : Math.round(((e.clientX - strackRect.left) * 100) / strackRect.width, 0);

    if (Math.abs(percent - rangeMin) <= Math.abs(percent - rangeMax)) {
      setRangeMin(percent);
    } else {
      setRangeMax(percent);
    }
  };

  const convertToHalf = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10
      : name === "area"
      ? Math.ceil(Math.round(percent * 0.9) / 5) * 5
      : 0;
  };

  const convertToFull = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1;
    return Math.floor((percent / target) * 100);
  };

  const handleActive = (code, value) => {
    setActivedEl(code);

    let arrMaxMin =
      name === "price" ? getNumberPrices(value) : getNumberAreas(value);
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setRangeMin(0);
        setRangeMax(convertToFull(1));
      }
      if (arrMaxMin[0] === 20) {
        setRangeMin(0);
        setRangeMax(convertToFull(20));
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setRangeMin(100);
        setRangeMax(100);
      }
    }
    if (arrMaxMin.length === 2) {
      setRangeMin(convertToFull(arrMaxMin[0]));
      setRangeMax(convertToFull(arrMaxMin[1]));
    }
  };

  const handleBeforeSubmit = () => {
    let min = rangeMin <= rangeMax ? rangeMin : rangeMax;
    let max = rangeMin <= rangeMax ? rangeMax : rangeMin;
    let arrMinMax = [convertToHalf(min), convertToHalf(max)];
    // const gaps = name === "price"
    //             ? getPriceCodes(arrMinMax, contents)
    //             : getAreaCodes(arrMinMax, contents)

    handleSubmit(
      {
        [`${name}Number`]: arrMinMax,
        [name]:
          name === "price"
            ? `Từ ${convertToHalf(min)} - ${convertToHalf(max)} triệu`
            : `Từ ${convertToHalf(min)} - ${convertToHalf(max)} m2`,
      },
      {
        [`${name}Arr`]: [min, max],
      }
    );
  };

  // const handleSubmit = () => {
  //   console.log("start", convertToFull(rangeMin));
  //   console.log("end", convertToFull(rangeMax));
  // };
  return (
    <div
      className={cx("modal")}
      onClick={() => {
        setIsShowModal(false);
      }}
    >
      <div className={cx("modal__inner")} onClick={(e) => e.stopPropagation()}>
        <div className={cx("modal__heading")}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={cx("modal__icon")}
            width={45}
            onClick={() => {
              setIsShowModal(false);
            }}
          />
          <span>{name}</span>
          <span></span>
        </div>
        {(name === "province" || name === "category") && (
          <div className={cx("modal__options")}>
            <span className={cx("modal__content")}>
              <input
                type="radio"
                name={name}
                id="default"
                value={defaultText || ""}
                checked={!queries[`${name}Code`] ? true : false}
                className={cx("modal__selection")}
                onChange={() =>
                  handleSubmit({ [name]: defaultText, [`${name}Code`]: null })
                }
              />
              <label htmlFor="default" className={cx("modal__text")}>
                {defaultText}
              </label>
            </span>
            {contents?.map((content) => (
              <span key={content.code} className={cx("modal__content")}>
                <input
                  type="radio"
                  name={name}
                  id={content.code}
                  value={content.code}
                  checked={
                    content.code === queries[`${name}Code`] ? true : false
                  }
                  className={cx("modal__selection")}
                  onChange={() =>
                    handleSubmit({
                      [name]: content.value,
                      [`${name}Code`]: content.code,
                    })
                  }
                />
                <label htmlFor={content?.code} className={cx("modal__text")}>
                  {content.value}
                </label>
              </span>
            ))}
          </div>
        )}

        {(name === "price" || name === "area") && (
          <>
            <div className={cx("modal__sliders")}>
              <div className={cx("modal__content")}>
                <div className={cx("modal__amount")}>
                  <span>
                    {rangeMin === 100 && rangeMax === 100
                      ? `Trên ${convertToHalf(rangeMin)} ${
                          name === "price" ? "triệu" : "m2"
                        }`
                      : `Từ ${
                          rangeMin <= rangeMax
                            ? convertToHalf(rangeMin)
                            : convertToHalf(rangeMax)
                        } -
                    ${
                      rangeMax >= rangeMin
                        ? convertToHalf(rangeMax)
                        : convertToHalf(rangeMin)
                    }
                    ${name === "price" ? "triệu" : "m2"}`}
                  </span>
                </div>
                <div
                  onClick={handleClickStrack}
                  className={cx("modal__slider")}
                  id="track"
                ></div>
                <div
                  onClick={handleClickStrack}
                  className={cx("modal__active")}
                  id="track-active"
                ></div>
                <input
                  max="100"
                  min="0"
                  step={1}
                  type="range"
                  value={rangeMin}
                  onChange={(e) => setRangeMin(+e.target.value)}
                  className={cx("modal__range")}
                />
                <input
                  max="100"
                  min="0"
                  step={1}
                  type="range"
                  value={rangeMax}
                  onChange={(e) => setRangeMax(+e.target.value)}
                  className={cx("modal__range")}
                />
              </div>
              <div className={cx("modal__number")}>
                <span
                  className={cx("modal__number-min")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStrack(e, 0);
                  }}
                >
                  0
                </span>
                <span
                  className={cx("modal__number-max")}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickStrack(e, 100);
                  }}
                >
                  15 triệu+
                </span>
              </div>
            </div>

            <div className={cx("modal__ranger")}>
              {contents?.map((content) => (
                <span
                  key={content.code}
                  onClick={() => handleActive(content.code, content.value)}
                  className={cx("modal__ranger-item", {
                    active: content.code === activedEl,
                  })}
                >
                  {name === "price"
                    ? `${content.value} đồng`
                    : `${content.value} m2`}
                </span>
              ))}
            </div>
          </>
        )}
        <button
          type="submit"
          onClick={handleBeforeSubmit}
          className={cx("modal__btn")}
        >
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default memo(Modal);
