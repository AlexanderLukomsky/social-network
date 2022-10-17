import { v1 } from 'uuid';
import { authReducer } from '../Login/auth-reducer';
import { profileReducer } from '../Profile/profile-reducer';
// import { v1 } from "uuid"
// import { ProfilePageType } from "../../common/types/StateType"
// import { profileReducer } from "./profile-reducer"
// let initState = {
//    profile: null,
//    posts: [{ id: v1(), message: 'message-1', likesCount: 5 }]
// }
// const ADD_POST: 'ADD-POST' = 'ADD-POST'
// beforeEach(() => {
//    initState = {
//       profile: null,
//       posts: [
//          { id: v1(), message: 'message-1', likesCount: 5 },
//          { id: v1(), message: 'message-2', likesCount: 8 },
//          { id: v1(), message: 'message-3', likesCount: 11 },
//          { id: v1(), message: 'message-4', likesCount: 14 },
//          { id: v1(), message: 'message-5', likesCount: 17 },
//       ],
//    }
// })
// test('new post should be added', () => {
//    const action = { type: ADD_POST, payload: { newPostText: 'its test text' } }
//    const newPost = profileReducer(initState, action)

//    newPost.posts.length === 5
//})

test('should first', () => {
   let initState = {
      profile: null,
      posts: [{ id: v1(), message: 'message-1', likesCount: 5 }]

   }
   const action = { type: 'ADD-POST' as const, payload: { newPostText: 'its test text' } }
   const newPost = profileReducer(initState, action)
   expect(newPost.posts.length).toBe(2)
   expect(newPost.posts[0].message).toBe('its test text')

})
