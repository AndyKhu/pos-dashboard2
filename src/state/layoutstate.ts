import { create } from 'zustand'
interface LayoutState {
  collapse: boolean
  menuCollapse: string
  setCollapse: (value: boolean) => void
  toggleCollapse: () => void
  setMenuCollapse: (value:string) => void
}

export const useLayoutState = create<LayoutState>()((set)=> ({
  collapse: false,
  menuCollapse: '',
  setCollapse: (collapse:boolean) => set({collapse}),
  toggleCollapse: () => set((state) => ({collapse: !state.collapse})),
  setMenuCollapse: (value:string) => set({menuCollapse: value})
}))