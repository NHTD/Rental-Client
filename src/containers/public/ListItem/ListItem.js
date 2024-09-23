import React, { memo, useEffect } from "react";
import styles from "./ListItem.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../../components";
import Item from "../Item/Item";
import { getPostsLimit } from "../../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const cx = classNames.bind(styles);

const ListItem = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }

    let searchParamsObject = {};

    params.forEach((i) => {
      // Nếu giá trị là mảng, chuyển nó thành chuỗi
      searchParamsObject[i[0]] = Array.isArray(searchParamsObject[i[0]])
        ? searchParamsObject[i[0]].concat(i[1])
        : [i[1]];
    });

    // Chuyển đổi các giá trị mảng thành chuỗi
    for (let key in searchParamsObject) {
      if (Array.isArray(searchParamsObject[key])) {
        searchParamsObject[key] = searchParamsObject[key].join(",");
      }
    }

    if (categoryCode) {
      searchParamsObject.categoryCode = categoryCode;
    }

    // console.log(searchParamsObject)

    setTimeout(() => {
      dispatch(getPostsLimit(searchParamsObject));
    }, 100);
  }, [searchParams, categoryCode, dispatch]);

  return (
    <div className={cx("news-items")}>
      <div className={cx("row")}>
        <h3 className={cx("text-heading")}>Danh sách tin đăng</h3>
        <span className={cx("text-desc")}>Cập nhật: 12:05 25/08/2022</span>
      </div>

      <div className={cx("sort-actions")}>
        <span>Sắp xếp:</span>
        <Button text="Mặc định" sortBtn />
        <Button text="Mới nhất" sortBtn />
      </div>

      <div>
        {posts?.length > 0 &&
          posts.map((post) => {
            return (
              <Item
                key={post?.id}
                address={post?.address}
                attribute={post?.attribute}
                description={post?.description}
                images={post?.images}
                star={+post?.star}
                title={post?.title}
                user={post?.user}
                id={post?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(ListItem);
