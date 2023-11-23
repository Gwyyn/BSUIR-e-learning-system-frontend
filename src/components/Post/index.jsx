import React from 'react';
import clsx from 'clsx';


import styles from './Post.module.scss';

import { UserInfo } from '../UserInfo';
import {EditIcon} from "../icons/EditIcon";
import {DeleteIcon} from "../icons/DeleteIcon";
import {EyeIcon} from "../icons/EyeIcon";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchRemovePost} from "../../redux/slices/posts";
import {logout} from "../../redux/slices/auth";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  tags,
  children,
  isFullPost,
  isLoading, // удалить в fullPost
  isEditable,
}) => {
  const dispatch = useDispatch()

  if (isLoading) {
    return <DeleteIcon />;
  }
  const onClickRemove = () => {
    if(window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(fetchRemovePost(id))
    }
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
              <EditIcon />
          </Link>
          <DeleteIcon onClick={onClickRemove}/>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon/>
              <span>{viewsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
