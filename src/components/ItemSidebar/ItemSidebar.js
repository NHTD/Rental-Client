import React, { memo, useCallback } from "react";
import styles from "../../containers/public/HomePage/HomePage.module.scss";
import classNames from "classnames/bind";
import icons from "../../utils/icons";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { formatVietnameseToString } from "../../utils/common/common";

const cx = classNames.bind(styles);

const { FaAngleRight } = icons;

const ItemSidebar = ({ title, content, isDouble, type }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handlePrice = (content) => {
    const oddEl = content?.filter((el, index) => index % 2 === 0);
    const eventEl = content?.filter((el, index) => index % 2 !== 0);

    const rs = oddEl?.map((el, index) => {
      return {
        left: el,
        right: eventEl?.find((el, index2) => index2 === index),
      };
    });

    return rs;
  };

  const handleFilterPost = useCallback(
    (code) => {
      navigate({
        pathname: location?.pathname,
        search: createSearchParams({
          [type]: code,
        }).toString(),
      });
    },
    [type, navigate, location.pathname]
  );

  return (
    <div className={cx("sidebar__item")}>
      <h3 className={cx("sidebar__heading")}>{title}</h3>
      {!isDouble && (
        <div className={cx("sidebar__content")}>
          <div className={cx("sidebar__inner")}>
            {content?.map((el) => (
              <Link
                to={`/${formatVietnameseToString(el.value)}`}
                key={el.code}
                className={cx("sidebar__value")}
              >
                <FaAngleRight size={12} color="#ccc" />
                <span>{el.value}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      {isDouble && (
        <div className={cx("sidebar__content")}>
          <div className={cx("sidebar__row")}>
            <div className={cx("sidebar__inner")}>
              {handlePrice(content)?.length > 0 &&
                handlePrice(content)?.map((el) => (
                  <div
                    onClick={() => handleFilterPost(el.left.code)}
                    key={el.left.code}
                    className={cx("sidebar__value")}
                  >
                    <FaAngleRight size={12} color="#ccc" />
                    <span>{el.left.value}</span>
                  </div>
                ))}
            </div>

            <div className={cx("sidebar__inner")}>
              {handlePrice(content)?.length > 0 &&
                handlePrice(content)?.map((el) => (
                  <div
                    onClick={() => handleFilterPost(el.right.code)}
                    key={el.right.code}
                    className={cx("sidebar__value")}
                  >
                    <FaAngleRight size={12} color="#ccc" />
                    <span>{el.right.value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
