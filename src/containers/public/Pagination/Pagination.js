import React, { memo, useEffect, useState } from "react";
import styles from "./Pagination.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { PageNumber } from "../../../components";
import icons from "../../../utils/icons";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

const { BsChevronDoubleRight, BsChevronDoubleLeft } = icons;

const Pagination = () => {
  const { totalPage, posts } = useSelector((state) => state.post);
  const [arrPage, setArrayPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let page = searchParams.get("offset");
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams, currentPage]);

  useEffect(() => {
    let maxPage = Math.floor(totalPage / 4);
    let end = +currentPage + 1 > maxPage ? maxPage : +currentPage + 1;
    let start = +currentPage - 1 <= 0 ? 1 : +currentPage - 1;

    let tmp = [];
    for (let i = start; i <= end; i++) {
      tmp.push(i);
    }
    setArrayPage(tmp);
    currentPage >= maxPage - 1 ? setIsHideEnd(true) : setIsHideEnd(false);
    currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false);
  }, [posts, currentPage, totalPage]);

  return (
    <div className={cx("pagination")}>
      {!isHideStart && (
        <PageNumber
          icon={<BsChevronDoubleLeft />}
          setCurrentPage={setCurrentPage}
          page={1}
        />
      )}
      {!isHideStart && <PageNumber page={"..."} />}
      {arrPage.length > 0 &&
        arrPage?.map((el) => (
          <PageNumber
            key={el}
            page={el}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}

      {!isHideEnd && <PageNumber page={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<BsChevronDoubleRight />}
          setCurrentPage={setCurrentPage}
          page={Math.floor(totalPage / posts.length)}
        />
      )}
    </div>
  );
};

export default memo(Pagination);
