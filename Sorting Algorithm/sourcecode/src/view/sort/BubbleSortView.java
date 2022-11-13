package view.sort;

import model.array.Array;
import model.sort.BubbleSort;
import model.sort.state.BubbleSortState;
import view.array.ArrayView;
import view.element.ElementView;

public class BubbleSortView extends SortView {
	public BubbleSortView(Array array, ArrayView arrayView) {
		// Set parent fields
		super(arrayView, new BubbleSort(array));
	}

	@Override
	public void selectElements() {
		if (arrayView.isSortingDone()) {
			displaySortSuccess(0);
			return;
		}

		BubbleSortState state = (BubbleSortState)algorithm.getState();

		if (state.j - 1 < arrayView.getArrayLength()) {
			arrayView.selectElementWithColor(state.j - 1, ElementView.BG_CYAN);
		}
		if (state.j < arrayView.getArrayLength()) {
			arrayView.selectElementWithColor(state.j, ElementView.BG_YELLOW);
		}
		displaySortSuccess(arrayView.getArrayLength() - state.i); // elements at index n-i -> n are sorted
	}
}
