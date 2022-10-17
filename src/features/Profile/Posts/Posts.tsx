import { useSelector } from 'react-redux'
import { selectAuth, selectProfile } from '../../../common/selectors/selectors'
import { useAppDispatch } from '../../../redux/redux-store'
import { addNewPost } from '../profile-reducer'
import { AddPostForm } from "./AddPostForm"
import { PostItem } from "./Post/PostItem"
import s from './Posts.module.scss'
export const Posts = () => {
   const dispatch = useAppDispatch()
   const profile = useSelector(selectProfile)
   const { isAuth } = useSelector(selectAuth)

   const addPostHandler = (newPost: { addNewPost: string }) => {
      dispatch(addNewPost(newPost.addNewPost))
   }
   return (
      <div className={s.posts}>
         {isAuth && <AddPostForm onSubmit={addPostHandler} />}
         <ul>
            {profile.posts.map(el => <li key={el.id} id={el.id}>
               <PostItem message={el.message} />
            </li>)}
         </ul>
      </div>
   )
}
