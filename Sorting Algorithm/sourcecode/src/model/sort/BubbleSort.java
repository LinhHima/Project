package model.sort;

import model.array.Array;
import model.sort.state.BubbleSortState;
import model.sort.state.SortState;

public class BubbleSort extends Sort {
	private BubbleSortState state;

	public BubbleSort(Array array) {
		// Call parent
		super(array);

		// Create state
		state = new BubbleSortState();
		state.i = 0;
		state.j = 1;
	}

	@Override
	public String toString() {
		return "Bubble sort";
	}

	@Override
	public void sort() {
		for (int i = 0; i < array.getLength(); i++) {
			for (int j = 1; j < array.getLength() - i; j++) {
				// SortAlgorithm in ascending order
				if (array.getValueAt(j - 1) > array.getValueAt(j)) {
					array.swap(j - 1, j);
				}
			}
		}
	}

	@Override
	public void stepForward() {
		saveState(state);

		if (state.i < array.getLength()) {
			if (state.j < array.getLength() - state.i) {
				if (array.getValueAt(state.j - 1) > array.getValueAt(state.j)) {
					array.swap(state.j - 1, state.j);
					saveSwapToLastState(state.j - 1, state.j);
				}
				state.j++;
			} else {
				state.i++;
				state.j = 1;
			}
		}
	}

	@Override
	public String printStateAsString() {
		if (state.i == 0 && state.j == 1)
			return "State: i = " + state.i + "; j-1 = " + (state.j - 1) + ", j = " + state.j
					+ ". Algorithm start. Swap? " + (array.getValueAt(state.j - 1) > array.getValueAt(state.j));
		if (state.i < array.getLength()) {
			if (state.j < array.getLength() - state.i) {
				return "State: i = " + state.i + "; j-1 = " + (state.j - 1) + ", j = " + state.j + ". Swap? "
						+ (array.getValueAt(state.j - 1) > array.getValueAt(state.j));
			} else {
				return "State: i = " + state.i + "; j-1 = " + (state.j - 1) + ", j = " + state.j
						+ ". Increment i and set j = 1";
			}
		} else {
			return "State: i = " + state.i + "; j-1 = " + (state.j - 1) + ", j = " + state.j + ". Algorithm end";
		}
	}

	@Override
	public SortState getState() {
		return state;
	}

	@Override
	public void cloneState() {
		try {
			state = (BubbleSortState) state.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public SortState loadState() {
		return state = (BubbleSortState) super.loadState();
	}
}
