import React, { memo } from "react";
import styles from "./SearchItem.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const SearchItem = ({ IconBefore, IconAfter, text, defaultText }) => {
  return (
    <div className={cx("search__item")}>
      <div className={cx("search__item-before")}>
        <span>
          <FontAwesomeIcon icon={IconBefore} className={cx("icon-before")} />
        </span>
        <span className={cx({ "search__item-text": text })}>{text || defaultText}</span>
      </div>
      <span>
        <FontAwesomeIcon icon={IconAfter} className={cx("icon-after")} />
      </span>
    </div>
  );
};

export default memo(SearchItem);
