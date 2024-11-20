import React, { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import classNames from "classnames/bind";
import { Button, Modal, SearchItem } from "../../../components";
import icons from "../../../utils/icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

const { faChevronRight, faTag, faCrop, faBuilding, faMagnifyingGlass } = icons;

const cx = classNames.bind(styles);

const Search = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [contents, setContents] = useState([]);
  const [name, setName] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState([]);
  const [defaultText, setDefaultText] = useState("");

  const { provinces } = useSelector((state) => state.provinces);
  const { areas } = useSelector((state) => state.areas);
  const { prices } = useSelector((state) => state.prices);
  const { category } = useSelector((state) => state.category);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);

  const handleShowModal = (contents, name, defaultText) => {
    setIsShowModal(true);
    setContents(contents);
    setName(name);
    setDefaultText(defaultText);
  };

  const handleSubmit = useCallback((query, arrMinMax) => {
    setQueries((prev) => ({ ...prev, ...query }));
    arrMinMax && setArrMinMax((prev) => ({ ...prev, ...arrMinMax }));
    setIsShowModal(false);
  }, []);

  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))
      .filter((item) => item[1]);
    const queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    // console.log(queryCodesObj)
    // dispatch(getPostsLimit(queryCodesObj))
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Number") || !item[0].includes("Code")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });

    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    }
        ${queryTextObj.province ? `Tỉnh ${queryTextObj.province}` : ""}
        ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""}
        ${queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""}
        `;

    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <>
      <div className={cx("search")}>
        <span
          onClick={() => handleShowModal(category, "category", "Tìm tất cả")}
          className={cx("search__item")}
        >
          <SearchItem
            IconBefore={faBuilding}
            text={queries.category}
            defaultText={"Tìm tất cả"}
          />
        </span>
        <span
          onClick={() => handleShowModal(provinces, "province", "Toàn quốc")}
          className={cx("search__item")}
        >
          <SearchItem
            IconBefore={faLocationDot}
            IconAfter={faChevronRight}
            text={queries.province}
            defaultText={"Toàn quốc"}
          />
        </span>
        <span
          onClick={() => handleShowModal(prices, "price", "Chọn giá")}
          className={cx("search__item")}
        >
          <SearchItem
            IconBefore={faTag}
            IconAfter={faChevronRight}
            text={queries.price}
            defaultText={"Chọn giá"}
          />
        </span>
        <span
          onClick={() => handleShowModal(areas, "area", "Chọn diện tích")}
          className={cx("search__item")}
        >
          <SearchItem
            IconBefore={faCrop}
            IconAfter={faChevronRight}
            text={queries.area}
            defaultText={"Chọn diện tích"}
          />
        </span>

        <span className={cx("search__item")}>
          <Button
            text="Tìm kiếm"
            IcBefore={faMagnifyingGlass}
            searchBtn
            onClick={handleSearch}
          />
        </span>
      </div>

      {isShowModal && (
        <Modal
          setIsShowModal={setIsShowModal}
          contents={contents}
          name={name}
          queries={queries}
          handleSubmit={handleSubmit}
          arrMinMax={arrMinMax}
          defaultText={defaultText}
        />
      )}
    </>
  );
};

export default Search;
