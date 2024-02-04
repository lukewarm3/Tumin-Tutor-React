import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: [],

  // the functions that manipulate the state
  createGroup: (group) => set((state) => ({ groups: [group, ...state.groups] })),

  //deleteGroup
  deleteGroup: (id) =>
    set((state) => ({ groups: state.groups.filter((group) => group.id !== id) })),

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
