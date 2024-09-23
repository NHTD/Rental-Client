import React, { useEffect, useState } from 'react'
import styles from './ManagePost.module.scss'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsOfUser } from '../../../store/actions/post'
import { Button } from '../../../components'

const cx = classNames.bind(styles)

const ManagePost = () => {
  const dispatch = useDispatch();
  const {postsOfUser} = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getPostsOfUser())
  }, [])

  return (
    <div>
      <div className={cx("manage-post__row")}>
        <h1 className={cx("manage-post__heading")}>Quản lý tin đăng</h1>
        <select name='' id=' ' className={cx("manage-post__select")}>
          <option value="">Lọc theo trạng thái</option>
        </select>
      </div>
      <table className={cx("manage-post__table")}>
          <thead>
            <tr>
              <th className={cx("manage-post__header")}>Mã tin</th>
              <th className={cx("manage-post__header")}>Ảnh đại diện</th>
              <th className={cx("manage-post__header")}>Tiêu đề</th>
              <th className={cx("manage-post__header")}>Giá</th>
              <th className={cx("manage-post__header")}>Ngày bắt đầu</th>
              <th className={cx("manage-post__header")}>Ngày hết hạn</th>
              <th className={cx("manage-post__header")}>Trạng thái</th>
              <th className={cx("manage-post__header")}>Tùy chọn</th>
            </tr>
          </thead>

          <tbody>
            {!postsOfUser?.postResponse
              ?
              <tr>
                <td>12345</td>
              </tr>
              :
              postsOfUser?.postResponse?.map(el => (
                <tr key={el?.id}>
                  <td className={cx("manage-post__body")}>{el?.id}</td>
                  <td className={cx("manage-post__body-thumbnail")}>
                    {el?.images?.map(item => (
                      <img src={item?.image} alt='thumbnail' className={cx("manage-post__thumbnail")}/>
                    ))}
                  </td>
                  <td className={cx("manage-post__body")}>{el?.title}</td>
                  <td className={cx("manage-post__body")}>{el?.attribute?.price}</td>
                  <td className={cx("manage-post__body")}>{el?.createdAt}</td>
                  <td className={cx("manage-post__body")}>{el?.expiredAt}</td>
                  <td className={cx("manage-post__body")}>{el?.status}</td>
                  <td className={cx("manage-post__body-action")}>
                    <button className={cx("manage-post__body-edit")}>Sửa</button>
                    <button className={cx("manage-post__body-delete")}>Xóa</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default ManagePost