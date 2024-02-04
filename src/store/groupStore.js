import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: [],

  // the functions that manipulate the state
  createGroup: (group) => set((state) => ({ groups: [group, ...state.groups] })),

  //deletePost
//   deletePost: (id) =>
//     set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),

  //setgroups
  setGroups: (groups) => set({ groups }),

  //addComment
//   addComment: (postId, comment) =>
//     set((state) => ({
//       posts: state.posts.map((post) =>
//         post.id === postId
//           ? { ...post, comments: [...post.comments, comment] }
//           : post
//       ),
//     })),
}));

export default useGroupStore;
