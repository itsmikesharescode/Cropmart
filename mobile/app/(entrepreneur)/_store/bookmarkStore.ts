import { create } from 'zustand';
import { produce } from 'immer';
import { EntrepLayoutQ } from '@/lib/db_types/entrepLayoutQ.types';
import { createSelectors } from '@/store/createSelectors';

interface BookMarkType {
	bookmarks: EntrepLayoutQ['bookmarks'];
	setBookmarks: (p: EntrepLayoutQ['bookmarks']) => void;
	resetBookmarks: () => void;
}

const bookmarkStore = create<BookMarkType>((set) => ({
	bookmarks: [],
	setBookmarks: (p) =>
		set(
			produce((state) => {
				state.bookmarks = p;
			})
		),
	resetBookmarks: () =>
		set(
			produce((state) => {
				state.bookmarks = [];
			})
		)
}));

export const useBookmarksSelector = createSelectors(bookmarkStore);
