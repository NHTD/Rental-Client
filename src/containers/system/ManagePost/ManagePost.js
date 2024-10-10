import React, { useEffect, useState } from 'react'
import styles from './ManagePost.module.scss'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsOfUser, editData, resetDataEdit } from '../../../store/actions/post'
import UpdatePost from '../UpdatePost/UpdatePost'
import { apiDeletePost } from '../../../services'
import Swal from 'sweetalert2'

const cx = classNames.bind(styles)

const ManagePost = () => {
  const { postsOfUser, dataEdit } = useSelector(state => state.post)

  const [isEdit, setIsEdit] = useState(false)
  const [posts, setPosts] = useState(postsOfUser?.postResponse || []) 

  const dispatch = useDispatch()

  useEffect(() => {
     dispatch(getPostsOfUser())
  }, [dataEdit])

  useEffect(() => {
    setPosts(postsOfUser?.postResponse || [])
  }, [postsOfUser])

  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId)
    if(response.data) {
      Swal.fire("Thành công", "Xóa tin đăng thành công", "success").then(() => dispatch(resetDataEdit()))
    } else {
      Swal.fire("Thất bại", "Xóa tin đăng thất bại", "error")
    }
  }

  const handleFilterStatus = (status) => {
    if (+status === 1) {
      const activePost = postsOfUser?.postResponse?.filter(el => el?.status === "ACTIVE")
      setPosts(activePost)
    } else if (+status === 0) {
      const expiredPost = postsOfUser?.postResponse?.filter(el => !el?.status)
      setPosts(expiredPost)
    } else {
      setPosts(postsOfUser?.postResponse)
    }
  }

  return (
    <div className={cx("manage-post")}>
      <div className={cx("manage-post__row")}>
        <h1 className={cx("manage-post__heading")}>Quản lý tin đăng</h1>
        <select className={cx("manage-post__select")} onChange={(e) => handleFilterStatus(e.target.value)}>
          <option value="2">Lọc theo trạng thái</option>
          <option value="1">Đang hoạt động</option>
          <option value="0">Đã hết hạn</option>
        </select>
      </div>
      <table className={cx("manage-post__table")}>
          <thead>
            <tr className={cx("manage-post__table-header")}>
              <th className={cx("manage-post__header", "manage-post__header-idx")}>Mã tin</th>
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
            {
              Array.isArray(posts) && posts.length > 0 ? (
                posts.map((el, index) => (
                  <tr key={el?.id} className={cx("manage-post__table-row")}>
                    <td className={cx("manage-post__body", "manage-post__body-idx")}>{index + 1}</td>
                    <td className={cx("manage-post__body-thumbnail")}>
                      {el?.images?.map(item => (
                        <img src={item?.image} alt='thumbnail' className={cx("manage-post__thumbnail")} />
                      ))}
                    </td>
                    <td className={cx("manage-post__body", "manage-post__body-title", "line-clamp", "line-2")}>{el?.title}</td>
                    <td className={cx("manage-post__body")}>{el?.attribute?.price}</td>
                    <td className={cx("manage-post__body")}>{el?.createdAt}</td>
                    <td className={cx("manage-post__body")}>{el?.expiredAt}</td>
                    <td className={cx("manage-post__body")}>{`${el?.status === "ACTIVE" ? "Đang hoạt động" : "Hết hạn"}`}</td>
                    <td className={cx("manage-post__body-action")}>
                      <button className={cx("manage-post__body-edit")} onClick={() => { setIsEdit(true); dispatch(editData(el)) }}>Sửa</button>
                      <button className={cx("manage-post__body-delete")} onClick={() => handleDeletePost(el?.id)}>Xóa</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className={cx("manage-post__table-row")}>
                  <td className={cx("manage-post__body")}>Không có dữ liệu</td>
                </tr>
              )
            }
          </tbody>
      </table>

      {isEdit && <UpdatePost dataEdit={dataEdit} isEdit={isEdit} setIsEdit={setIsEdit} />}
    </div>
  )
}

export default ManagePost
