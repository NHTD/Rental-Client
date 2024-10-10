import React, { memo } from 'react'
import Slider from "react-slick";
import classNames from 'classnames/bind';
import styles from './SliderCustom.module.scss'

const cx = classNames.bind(styles);

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const SliderCustom = ({images}) => {
  return (
    <div className={cx("slider")}>
      {
        <Slider {...settings}>
          {images?.map((image, index) => (
            <div key={index} className={cx("slider__wrapper")}>
              <img src={image?.image} alt='thumbnail' className={cx("slider__thumb")}/>
            </div>
          ))}
        </Slider>
      }
    </div>
  )
}

export default memo(SliderCustom)