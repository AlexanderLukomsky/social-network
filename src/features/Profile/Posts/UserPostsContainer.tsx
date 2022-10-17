import { connect } from "react-redux"
import { addNewPost } from "../profile-reducer"
import { ActionType, AppStateType } from "../../../redux/redux-store"
import { UserPosts } from "./UserPosts"


const MapStateToProps = (state: AppStateType) => {
   return {
      profilePage: state.profilePage,
      isAuth: state.auth.isAuth
   }
}
const MapDispatchToProps = (dispatch: (action: ActionType) => void) => {
   return {
      addNewPost: (newPostText: string) => {
         dispatch(addNewPost(newPostText))
      }
   }
}
export const UserPostsContainer = connect(MapStateToProps, MapDispatchToProps)(UserPosts)

