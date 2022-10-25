import { useSelector } from 'react-redux';

import { selectProfile } from '../../../common/selectors/selectors';

import { PostItem } from './Post/PostItem';
import s from './Posts.module.scss';

export const Posts = () => {
  const profile = useSelector(selectProfile);

  return (
    <div className={s.posts}>
      <ul>
        {profile.posts.map(el => (
          <li key={el.id} id={el.id}>
            <PostItem message={el.message} />
          </li>
        ))}
      </ul>
    </div>
  );
};
