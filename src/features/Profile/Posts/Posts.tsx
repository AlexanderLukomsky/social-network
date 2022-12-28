import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

import { AddPost } from './add-post/AddPost';
import { PostItem } from './Post/PostItem';
import s from './posts.module.scss';

import { selectProfilePosts } from 'common/selectors';

export const Posts = () => {
  const posts = useSelector(selectProfilePosts);
  return (
    <div>
      <AddPost />
      <Paper elevation={5} className={s.posts}>
        <ul className={s.list}>
          {posts.map(el => (
            <PostItem message={el.message} key={el.id} id={el.id} />
          ))}
        </ul>
      </Paper>
    </div>
  );
};
