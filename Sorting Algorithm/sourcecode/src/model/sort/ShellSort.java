package model.sort;

import model.array.Array;
import model.sort.state.ShellSortState;
import model.sort.state.SortState;

public class ShellSort extends Sort {
	private ShellSortState state;

	public ShellSort(Array array) {
		// Call parent
		super(array);

		// Create state
		state = new ShellSortState();
		state.interval = array.getLength() / 2;
		state.i = state.interval;
	}

	@Override
	public String toString() {
		return "Shell sort";
	}

	@Override
	public void sort() {
		// Halve interval until interval = 1
		for (int interval = array.getLength() / 2; interval > 0; interval /= 2) {
			// Swap pairs of elements with gap = interval
			// so the pairs are in sorted order (ascending)
			for (int i = interval; i < array.getLength(); i++) {
				// Temporarily hold element at i
				int temp = array.getValueAt(i);
				int j;
				for (j = i; j >= interval && array.getValueAt(j - interval) > array.getValueAt(i); j -= interval) {
					array.setValueAt(j, array.getValueAt(j - interval));
				}
				array.setValueAt(j, temp);
			}
		}
	}

	@Override
	public void stepForward() {
		if (state.interval <= 0)
			return;

		saveState(state);

		int temp = array.getValueAt(state.i);
		int j = state.i;

		while (j >= state.interval && array.getValueAt(j - state.interval) > temp) {
			array.swap(j - state.interval, j);
			saveSwapToLastState(j - state.interval, j);
			j -= state.interval;
		}

		// update i (and interval if i is index of final element)
		if (state.i == array.getLength() - 1) {
			state.interval /= 2;
			state.i = state.interval;
		} else {
			state.i++;
		}
	}

	@Override
	public String printStateAsString() {
		return "Interval: " + state.interval + "\nCurrent i: " + state.i;
	}

	@Override
	public SortState getState() {
		return state;
	}

	@Override
	public void cloneState() {
		try {
			state = (ShellSortState) state.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public SortState loadState() {
		return state = (ShellSortState) super.loadState();
	}
}
