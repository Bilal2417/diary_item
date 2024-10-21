import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";


interface DiaryItem {
  id: string;
  item: string;
  date: string;
  description: string;
}


interface DiaryState {
  items: DiaryItem[];
}


export const diarySlice = createSlice({
  name: 'diarySlice',
  initialState: {
    items: [],
  } as DiaryState,
  reducers: {
    addItem: (storedData, action: PayloadAction<Omit<DiaryItem, 'id'>>) => {
      const item: DiaryItem = {
        id: nanoid(),
        ...action.payload,
      };
      storedData.items.push(item);
    },
    removeItem: (storedData, action: PayloadAction<{ id: string }>) => {
      storedData.items = storedData.items.filter(storedItem => storedItem.id !== action.payload.id);
    },
  },
});


export const { addItem, removeItem } = diarySlice.actions;

