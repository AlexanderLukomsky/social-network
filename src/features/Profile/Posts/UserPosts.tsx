import { ProfilePageType } from "../../../common/types/StateType"
import { AddPostForm } from "./AddPostForm"
import { PostItem } from "./Post/PostItem"
import s from './Posts.module.scss'
type PostsPropsType = {
   profilePage: ProfilePageType
   addNewPost: (newPostText: string) => void
   isAuth: boolean
}
export const UserPosts = ({ profilePage, ...props }: PostsPropsType) => {
   const addPost = (newPost: { addNewPost: string }) => {
      props.addNewPost(newPost.addNewPost)
   }
   return (
      <div className={s.posts}>
         {props.isAuth && <AddPostForm onSubmit={addPost} />}
         <ul>
            {profilePage.posts.map(el => <li key={el.id} id={el.id}>
               <PostItem message={el.message} />
            </li>)}
         </ul>
      </div>
   )
}