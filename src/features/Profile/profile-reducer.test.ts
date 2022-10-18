import { ProfilePageType } from '../../common/types/StateType';
import { addNewPost, deletePost, profileReducer } from './profile-reducer';
let initState = {} as ProfilePageType
beforeEach(() => {
   initState = {
      profile: null,
      posts: [
         { id: 'first', message: 'message-1', likesCount: 5 },
         { id: 'second', message: 'message-2', likesCount: 8 },
         { id: 'third', message: 'message-3', likesCount: 11 }
      ],
      status: 'idle'
   }
})
test('message of new post should be correct', () => {
   const newPost = profileReducer(initState, addNewPost('its test text'))
   expect(newPost.posts[0].message).toBe('its test text')
})
test('post length should be increment', () => {
   const newPost = profileReducer(initState, addNewPost('its test text'))
   expect(newPost.posts.length).toBe(4)
})
test('correct post should be deleted', () => {
   const newPost = profileReducer(initState, deletePost('first'))
   expect(newPost.posts.length).toBe(2)
   expect(newPost.posts[0].message).toBe('message-2')
   expect(newPost.posts[1].message).toBe('message-3')
})