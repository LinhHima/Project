package view.sort;

import model.array.Array;
import model.sort.ShellSort;
import model.sort.state.ShellSortState;
import view.array.ArrayView;
import view.element.ElementView;

public class ShellSortView extends SortView {
	public ShellSortView(Array array, ArrayView arrayView) {
		// Set parent fields
		super(arrayView, new ShellSort(array));
	}

	@Override
	public void selectElements() {
		if (arrayView.isSortingDone()) {
			displaySortSuccess(0);
			return;
		}

		ShellSortState state = (ShellSortState) algorithm.getState();

		arrayView.selectElementWithColor(state.i, ElementView.BG_BLUE);
		int temp = state.i - state.interval;
		while (temp >= 0) {
			arrayView.selectElementWithColor(temp, ElementView.BG_YELLOW);
			temp -= state.interval;
		}
	}
}
