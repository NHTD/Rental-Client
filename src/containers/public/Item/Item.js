import React from "react";
import styles from "./Item.module.scss";
import classNames from "classnames/bind";
import icons from "../../../utils/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { path } from "../../../utils/constant";

const { faStar, BsBookmarkStarFill } = icons;

const cx = classNames.bind(styles);

const Item = ({
  images,
  user,
  title,
  star,
  description,
  attribute,
  address,
  id,
}) => {
  // const [isMouseHeart, setIsMouseHeart] = useState(false);

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(
        <FontAwesomeIcon icon={faStar} className={cx("item-content_icon")} />
      );
    }

    return stars;
  };
  console.log(user);

  //className={cx("item-thumbnail")}
  return (
    <div className={cx("item-row")}>
      <Link to={`${path.HOME}chi-tiet/${id}`} className={cx("item-images")}>
        <img
          src={
            images?.length > 0
              ? images[0]?.image
              : "https://phongtro123.com/img/thumb_default.jpg"
          }
          alt="preview"
          className={cx("item-thumbnail")}
        />

        <span className={cx("item-length")}>{images?.length} ảnh</span>

        {/* <span
          className={cx("item-heart")}
          onMouseEnter={() => setIsMouseHeart(true)}
          onMouseLeave={() => setIsMouseHeart(false)}
        >
          {isMouseHeart ? (
            <BsHeartFill className={cx("item-heart__enter")} />
          ) : (
            <BsHeart className={cx("item-heart__leave")} />
          )}
        </span> */}
      </Link>
      <div className={cx("item-content")}>
        <div className={cx("item-content_row")}>
          <h3 className={cx("item-content_heading")}>
            <div className={cx("item-content_icons")}>
              {handleStar.length > 0 &&
                handleStar(+star).map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
            </div>
            <Link to={`chi-tiet/${id}`} className={cx("line-clamp", "line-2")}>
              {title}
            </Link>
          </h3>
          <div>
            <BsBookmarkStarFill size={17} color="orange" />
          </div>
        </div>
        <div className={cx("item-content_row")}>
          <div className={cx("item-content_infor")}>
            <span className={cx("item-content_price")}>{attribute?.price}</span>
            <span className={cx("item-content_acreage")}>
              {attribute?.acreage}
            </span>
            <span className={cx("item-content_area")}>{address}</span>
          </div>
          <div className={cx("item-content_time")}>
            <span>3 giờ trước</span>
          </div>
        </div>
        <p className={cx("item-content_desc", "line-clamp", "line-3")}>
          {description}
        </p>
        <div className={cx("item-content_row")}>
          <div className={cx("item-content_personal")}>
            <img
              src="https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2022/05/23/anh-2-1-590x308_1653278194.jpg"
              alt="avatar"
              className={cx("item-content_avatar")}
            />
            <span className={cx("item-content_name")}>{user?.name}</span>
          </div>
          <div className={cx("item-content_contact")}>
            {user?.phone && (
              <>
                <span className={cx("item-content_phone")}>
                  Gọi {user?.phone}
                </span>
                <span className={cx("item-content_zalo")}>Nhắn Zalo</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
