import React, { useEffect } from 'react'
import classNames from "classnames/bind";
import styles from "./DetailPost.module.scss";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../../store/actions/post';
import { RelatedPost, SliderCustom } from '../../../components';
import icons from '../../../utils/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment/moment";
import "moment/locale/vi";

const cx = classNames.bind(styles);

const {faStar, faLocationDot} = icons

const DetailPost = () => {
  const dispatch = useDispatch()
  const { post } = useSelector((state) => state.post)
  const { token } = useSelector((state) => state.auth)
  const params = useParams()
  const postId = params["postId"]

  useEffect(() => {
    dispatch(getPostById(postId))
  }, [postId, dispatch])

  const star = (el) => {
    const starIcon = []
    for(let i=1; i<=el; i++){
      starIcon.push(<FontAwesomeIcon icon={faStar}/>)
    }
    return starIcon
  }

  useEffect(() => {
    window.scrollTo({
           top: 0,
           left: 0,
          //  behavior: "smooth"
         });
 }, [postId])

  console.log(123)
  return (
    <div className={cx("detail")}>
      <div className={cx("detail__post")}>
        <div className={cx("detail__silder")}>
          {
            post?.images?.length === 1
            ?
            <img src={post?.images[0]?.image} alt='img' className={cx("detail__img")}/>
            : 
            post?.images?.length>0 && <SliderCustom images={post?.images} />
          }
        </div>

        <div className={cx("detail__content")}>
          <div className={cx("detail__header")}>
            <h2 className={cx("detail__title")}>
              <span className={cx("detail__star")}>
                {post?.images?.length>0 && star(post?.star)}
              </span>
              {post?.title}
            </h2>
          </div>

          <span className={cx("detail__address")}>
            <span className={cx("detail__location-dot")}>
              <FontAwesomeIcon icon={faLocationDot}/>
            </span>
            Địa chỉ: {post?.address}
          </span>  

          <div className={cx("detail__attributes")}>
            <span className={cx("detail__price")}>
              <img 
                src='https://phongtro123.com/images/price-icon.svg' 
                className={cx("detail__price-icon")} 
                alt='acreage'
              >
              </img>
              {post?.attribute?.price}
            </span>

            <span className={cx("detail__acreage")}>
              <img 
                src='https://phongtro123.com/images/acreage-icon.svg' 
                className={cx("detail__acreage-icon")} 
                alt='acreage'
              >
              </img>
              {post?.attribute?.acreage}
            </span>

            <span className={cx("detail__time")}>
              <img 
                src='https://phongtro123.com/images/wall-clock-icon.svg' 
                className={cx("detail__time-icon")} 
                alt='acreage'
              >
              </img>
              {moment(post?.attribute?.createdAt).fromNow()}
            </span>
            
            <span className={cx("detail__hashtag")}>
              <img 
                src='https://phongtro123.com/images/hashtag.svg' 
                className={cx("detail__hashtag-icon")} 
                alt='acreage'
              >
              </img>
              {post?.attribute?.id}
            </span>
          </div>

          <div className={cx("detail__main-content")}>
            <span className={cx("detail__describe")}>Thông tin mô tả</span>
            <p className={cx("detail__description")} dangerouslySetInnerHTML={{ __html: post?.description?.replace(/\n/g, '<br/><br/>') }}></p>
          </div>

          <div className={cx("detail__overview")}>
            <span className={cx("detail__overview-title")}>Đặc điểm tin đăng</span>

            <table className={cx("detail__table")}>
              <tbody className={cx("detail__table-body")}>
                <tr className={cx("detail__table-row")}>
                  <td>Mã tin:</td>
                  <td>#{post?.attribute?.id}</td>
                </tr>
                <tr className={cx("detail__table-row")}>
                  <td>Chuyên mục:</td>
                  <td>{post?.category?.value}</td>
                </tr >
                <tr className={cx("detail__table-row")}>
                  <td>Khu vực:</td>
                  <td>{post?.province?.value}</td>
                </tr>
                <tr className={cx("detail__table-row")}>
                  <td>Đối tượng thuê:</td>
                  <td>Tất cả</td>
                </tr>
                <tr className={cx("detail__table-row")}>
                  <td>Ngày đăng:</td>
                  <td>{moment(post?.created_at).fromNow()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {post?.user?.phone
          &&
          <div className={cx("detail__overview")}>
            <span className={cx("detail__overview-title")}>Thông tin liên hệ</span>

            <table className={cx("detail__table")}>
              <tbody className={cx("detail__table-body")}>
                <tr className={cx("detail__table-row")}>
                  <td>Liên hệ:</td>
                  <td>{post?.user?.name}</td>
                </tr>
                <tr className={cx("detail__table-row")}>
                  <td>Điện thoại:</td>
                  <td>{post?.user?.phone}</td>
                </tr >
                <tr className={cx("detail__table-row")}>
                  <td>Zalo</td>
                  <td>{post?.user?.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
          }
        </div>
      </div>  
      <div className={cx("detail__sidebar")}>
          <div className={cx("detail__author")}>
            <div>
              <img 
                src={post?.user?.avatar || "https://phongtro123.com/images/default-user.png"} 
                alt='avatar'
                className={cx("detail__avatar")}
              />
            </div>
            
            <span className={cx("detail__name")}>{post?.user?.name}</span>
            <span className={cx("detail__status")}>
              {
                token 
                && 
                <>
                  <span className={cx("detail__dot")}></span>
                  {post?.user?.enabled === true && "Đang hoạt động"}
                </>
              }
            </span>

            <div className={cx("detail__phone")}>
              <img 
                src={"https://phongtro123.com/images/phone-call-white.svg"} 
                alt='phone'
                className={cx("detail__phone-img")}
              />
              <span className={cx("detail__phone-text")}>
                {post?.user?.phone}
              </span>
            </div>
          </div>
        
          <RelatedPost/>

      </div>
    </div>
  )
}

export default DetailPost