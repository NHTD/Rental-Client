import React from 'react'
import styles from './UpdatePost.module.scss'
import classNames from 'classnames/bind'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch } from 'react-redux'
import { resetDataEdit } from '../../../store/actions/post'

const cx = classNames.bind(styles)

const UpdatePost = ({setIsEdit}) => {
  const dispatch = useDispatch()
  return (
    <div className={cx("update-post")}
        onClick={(e) => {
            e.stopPropagation();
            dispatch(resetDataEdit())
            setIsEdit(false);
        }}
    >
        <div className={cx("update-post__content")} onClick={(e) => e.stopPropagation()}>
            <CreatePost isEdit setIsEdit={setIsEdit}/>
        </div>
    </div>
  )
}

export default UpdatePost