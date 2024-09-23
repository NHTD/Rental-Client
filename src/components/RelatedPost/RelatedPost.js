import React, { useEffect } from "react";
import styles from "./RelatedPost.module.scss";
import classNames from "classnames/bind";
import SubItem from "../SubItem/SubItem";
import { useDispatch, useSelector } from "react-redux";
import { getNewPosts } from "../../store/actions/post";

const cx = classNames.bind(styles);

const RelatedPost = () => {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state) => state.post);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getNewPosts());
    }, 100);
  }, []);

  return (
    <div className={cx("related__post")}>
      <h3 className={cx("related__post-heading")}>Tin mới đăng</h3>
      {newPosts?.map((newPost) => (
        <div key={newPost.id} className={cx("related__post-inner")}>
          <SubItem
            title={newPost.title}
            price={newPost.attribute.price}
            time={newPost.created_at}
          />
        </div>
      ))}
    </div>
  );
};

export default RelatedPost;
