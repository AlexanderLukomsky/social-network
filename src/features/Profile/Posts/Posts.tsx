import { useSelector } from 'react-redux';

import { PostItem } from './Post/PostItem';
import s from './Posts.module.scss';

import { selectProfilePosts } from 'common/selectors';

export const Posts = () => {
  const posts = useSelector(selectProfilePosts);

  return (
    <div className={s.posts}>
      <ul>
        {posts.map(el => (
          <li key={el.id} id={el.id}>
            <PostItem message={el.message} />
          </li>
        ))}
      </ul>
    </div>
  );
};
