import { create } from "zustand";

const useGroupStore = create((set) => ({
  groups: [],

  // the functions that manipulate the state
  createGroup: (group) =>
    set((state) => ({ groups: [group, ...state.groups] })),

  //deleteGroup
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
    })),

  //setgroups
  setGroups: (groups) => set({ groups }),

  //addStudent
  joinGroup: (groupId, student) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? { ...group, students: [student.uid, ...group.students] }
          : group
      ),
    })),

  //removeStudent
  leaveGroup: (groupId, student) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              students: group.students.filter((id) => id !== student.uid),
            }
          : group
      ),
    })),

    //addTutor
  addTutor: (groupId, tutor) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? { ...group, tutor: tutor }
          : group
      ),
    })),

    //removeTutor
  removeTutor: (groupId) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              tutor: ""
            }
          : group
      ),
    })),
}));

export default useGroupStore;
