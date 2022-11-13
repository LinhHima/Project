package model.sort;

import java.util.EmptyStackException;
import java.util.NoSuchElementException;
import java.util.Stack;

import model.array.Array;
import model.sort.state.SortState;

public abstract class Sort {
	protected Array array;
	protected Stack<SortState> history;

	public Sort(Array array) {
		this.array = array;
		this.history = new Stack<>();
	}

	public abstract void sort();

	public abstract void stepForward();

	public void stepBackward() throws EmptyStackException {
		loadState();
	}

	public abstract SortState getState();

	/**
	 * Describe the next step to take in the algorithm.
	 */
	public abstract String printStateAsString();

	/**
	 * Save the child's state. Child's state should be cloned <b>after</b> saving.
	 */
	public void saveState(SortState state) {
		history.push(state);
		cloneState();
	}

	/**
	 * Implementations should clone their state based on old one.
	 */
	public abstract void cloneState();

	/**
	 * Save a swap operation to the last state. This should be performed
	 * <b>after</b> cloning the child's state.
	 */
	public void saveSwapToLastState(int index1, int index2) {
		try {
			SortState state = history.lastElement();
			state.swapIndex1 = index1;
			state.swapIndex2 = index2;
		} catch (NoSuchElementException e) {
			// Do nothing
		}

	}

	/**
	 * Child classes should override to load the state into their own field.<br>
	 * For example: <code>state = super.loadState();</code>
	 * 
	 * @return Last state
	 * @throws EmptyStackException
	 */
	public SortState loadState() throws EmptyStackException {
		SortState state = history.pop();
		if (state.swapIndex1 != null) {
			array.swap(state.swapIndex1, state.swapIndex2);
		}
		return state;
	}
}
