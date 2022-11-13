package model.sort;

import model.array.Array;
import model.sort.state.HeapSortState;
import model.sort.state.HeapSortState.HeapSortExtractElementStep;
import model.sort.state.HeapSortState.HeapSortStep;
import model.sort.state.SortState;

public class HeapSort extends Sort {
	private HeapSortState state;

	public HeapSort(Array array) {
		// Call parent
		super(array);

		// Create state
		state = new HeapSortState();
		state.heapifyLength = array.getLength();
		state.i = state.heapifyLength / 2 - 1;
		state.root = state.i;
	}

	@Override
	public String toString() {
		return "Heap sort";
	}

	/**
	 * Heapify a subtree.
	 * 
	 * @param array  Entire array representation of binary heap
	 * @param length Length of subtree
	 * @param root   The subtree's root
	 */
	private void heapify(Array array, int length, int root) {
		// Find maximum element in subtree
		int largest = root;
		int left = 2 * root + 1;
		int right = 2 * root + 2;
		if (left < length && array.getValueAt(left) > array.getValueAt(largest)) {
			largest = left;
		}
		if (right < length && array.getValueAt(right) > array.getValueAt(largest)) {
			largest = right;
		}
		if (largest != root) {
			// Max-heapify: Swap larger child with smaller parent
			array.swap(root, largest);

			// Heapify subtree starting from new root
			heapify(array, length, largest);
		}
	}

	@Override
	public void sort() {
		// Build max heap
		// from every node that has children
		// consider subtree roots from bottom-up (to ensure every subtree in the heap
		// satisfies the heap condition)
		for (int i = array.getLength() / 2 - 1; i >= 0; i--)
			heapify(array, array.getLength(), i);

		for (int i = array.getLength() - 1; i >= 0; i--) {
			// Swap root with array[i]
			array.swap(0, i);

			// Heapify from every node except for the sorted ones at the end
			heapify(array, i, 0);
		}
	}

	/**
	 * Perform the next step in the heap sort algorithm.
	 */
	@Override
	public void stepForward() {
		saveState(state);

		if (state.isOnlyHeapify == false) {
			switch (state.heapSortStep) {
			case BUILD_MAX_HEAP: {
				if (state.i >= 0) {
					// Build max heap
					state.root = state.i;
					state.isOnlyHeapify = true;
				} else {
					// End build max heap, start extract elements
					state.i = array.getLength() - 1;
					state.heapSortStep = HeapSortStep.EXTRACT_ELEMENTS;
					return;
				}
				break;
			}
			case EXTRACT_ELEMENTS: {
				if (state.i >= 0) {
					switch (state.heapSortExtractElementStep) {
					case SWAP_ROOT_WITH_LAST_ELEMENT:
						// Swap root with array[i]
						array.swap(0, state.i);
						saveSwapToLastState(0, state.i);
						state.heapSortExtractElementStep = HeapSortExtractElementStep.EXTRACT_INTO_SORTED_ARRAY;
						return;
					case EXTRACT_INTO_SORTED_ARRAY:
						// Heapify from every node except for the sorted ones at the end
						state.root = 0;
						state.heapifyLength--;
						state.heapSortExtractElementStep = HeapSortExtractElementStep.HEAPIFY;
						return;
					default:
						break;
					}
				} else {
					// End extract elements, end algorithm
					return;
				}
			}
			}
		} else {
			// Continued from heapify
		}
		// Heapify
		int largest = state.root;
		int left = 2 * state.root + 1;
		int right = 2 * state.root + 2;
		if (left < state.heapifyLength && array.getValueAt(left) > array.getValueAt(largest)) {
			largest = left;
		}
		if (right < state.heapifyLength && array.getValueAt(right) > array.getValueAt(largest)) {
			largest = right;
		}
		if (largest != state.root) {
			// Heapify lower subtree
			array.swap(state.root, largest);
			saveSwapToLastState(state.root, largest);
			state.root = largest;
		} else {
			// Finish one loop of build max-heap
			state.isOnlyHeapify = false;
			state.i--;
			// Finish one loop of extract elements
			if (state.heapSortStep == HeapSortStep.EXTRACT_ELEMENTS) {
				state.heapSortExtractElementStep = HeapSortExtractElementStep.SWAP_ROOT_WITH_LAST_ELEMENT;
			}
		}
	}

	@Override
	public String printStateAsString() {
		StringBuilder sb = new StringBuilder();
		boolean heapify = true;
		int i = state.i;
		int root = state.root;

		sb.append("i = " + i + "\n");
		sb.append("Step: ");
		switch (state.heapSortStep) {
		case BUILD_MAX_HEAP: {
			if (i >= 0) {
				sb.append("Build max-heap\n");
				if (state.isOnlyHeapify == false) {
					root = i;
				}
			} else {
				sb.append("i < 0. End build max-heap, start extract elements\n");
			}
			break;
		}
		case EXTRACT_ELEMENTS: {
			if (i >= 0) {
				sb.append("Extract elements\n");
				switch (state.heapSortExtractElementStep) {
				case SWAP_ROOT_WITH_LAST_ELEMENT: {
					sb.append("Swap root " + array.getElementAt(0) + " with last element " + array.getElementAt(i)
							+ "\n");
					heapify = false;
					break;
				}
				case EXTRACT_INTO_SORTED_ARRAY: {
					sb.append("Extract " + array.getElementAt(i) + " into sorted array\n");
					heapify = false;
					break;
				}
				default:
					break;
				}
			} else {
				// End extract elements, end algorithm
				sb.append("i < 0. End extract elements, end algorithm\n");
				heapify = false;
			}
		}
		}
		if (state.heapifyLength <= 0) {
			heapify = false;
			sb.append("Heap is empty.\n");
		}
		if (heapify) {
			sb.append("Heapify subtree with root " + array.getElementAt(root) + ": \n");
			int largest = root;
			int left = 2 * root + 1;
			int right = 2 * root + 2;

			if (left < state.heapifyLength) {
				sb.append("Left child: " + array.getElementAt(left) + "\n");
				if (array.getValueAt(left) > array.getValueAt(largest)) {
					largest = left;
				}
			} else {
				sb.append("Element " + array.getElementAt(root) + " has no left child.\n");
			}

			if (right < state.heapifyLength) {
				sb.append("Right child: " + array.getElementAt(right) + "\n");
				if (array.getValueAt(right) > array.getValueAt(largest)) {
					largest = right;
				}
			} else {
				sb.append("Element " + array.getElementAt(root) + " has no right child.\n");
			}

			sb.append(
					"Largest element between root, left child and right child: " + array.getElementAt(largest) + "\n");
			if (largest != root) {
				sb.append("Swap root " + array.getElementAt(root) + " with larger child " + array.getElementAt(largest)
						+ "\n");
			} else {
				sb.append("No swaps. Decrement i\n");
			}
		}
		sb.append("Heap: " + array.toString(state.heapifyLength) + "\n");
		sb.append("Sorted array: " + array.toString(state.heapifyLength, array.getLength()));
		return sb.toString();
	}

	@Override
	public SortState getState() {
		return state;
	}

	@Override
	public void cloneState() {
		try {
			state = (HeapSortState) state.clone();
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public SortState loadState() {
		return state = (HeapSortState) super.loadState();
	}
}
