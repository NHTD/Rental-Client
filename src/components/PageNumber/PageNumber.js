import React, { memo } from "react";
import styles from "./PageNumber.module.scss";
import classNames from "classnames/bind";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const cx = classNames.bind(styles);

const PageNumber = ({ page, currentPage, icon, setCurrentPage }) => {
  const navigate = useNavigate();
  const [paramsSearch] = useSearchParams();
  const location = useLocation();

  let entries = paramsSearch.entries();

  const append = (entries) => {
    let params = [];

    paramsSearch.append("offset", +page);

    for (let entry of entries) {
      params.push(entry);
    }

    let searchParamsObject = {};

    params?.forEach((i) => {
      if (
        Object.keys(searchParamsObject)?.some(
          (item) => item === i[0] && item !== "offset"
        )
      ) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });

    // let a = {};

    // params?.map((el) => {
    //   a = { ...a, [el[0]]: el[1] };
    // });

    return searchParamsObject;
  };

  const handleChangePage = () => {
    if (!(page === "...")) {
      setCurrentPage(+page);
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };

  return (
    <div
      className={cx(
        "page__number",
        { isActive: +page === +currentPage },
        { notActive: page === "..." }
      )}
      onClick={handleChangePage}
    >
      {icon || page}
    </div>
  );
};

export default memo(PageNumber);
