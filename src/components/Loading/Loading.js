import React from 'react'
import {ColorRing} from 'react-loader-spinner'
import classNames from 'classnames/bind'
import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

const Loading = () => {
  return (
    <div className={cx("loading-overlay")}>
      <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#ccc']}
      />
    </div>
  )
}

export default Loading