package view.sort;

import model.array.Array;
import model.sort.HeapSort;
import model.sort.state.HeapSortState;
import view.array.ArrayView;
import view.element.ElementView;

public class HeapSortView extends SortView {
	public HeapSortView(Array array, ArrayView arrayView) {
		// Set parent fields
		super(arrayView, new HeapSort(array));
	}

	@Override
	public void selectElements() {
		if (arrayView.isSortingDone()) {
			displaySortSuccess(0);
			return;
		}

		HeapSortState state = (HeapSortState)algorithm.getState();

		displaySortSuccess(state.heapifyLength);

		boolean heapify = true;
		int root = state.root;

		// sb.append("i = " + i + "\n");
		// sb.append("Step: ");
		switch (state.heapSortStep) {
		case BUILD_MAX_HEAP: {
			if (state.i >= 0) {
				// sb.append("Build max-heap\n");
				if (state.isOnlyHeapify == false) {
					root = state.i;
				}
			} else {
				// sb.append("i < 0. End build max-heap, start extract elements\n");
			}
			break;
		}
		case EXTRACT_ELEMENTS: {
			if (state.i >= 0) {
				// sb.append("Extract elements\n");
				switch (state.heapSortExtractElementStep) {
				case SWAP_ROOT_WITH_LAST_ELEMENT: {
					arrayView.selectElementWithColor(0, ElementView.BG_YELLOW);
					arrayView.selectElementWithColor(state.i, ElementView.BG_YELLOW);
					heapify = false;
					break;
				}
				case EXTRACT_INTO_SORTED_ARRAY: {
					// sb.append("Extract " + array.getElementAt(i) + " into sorted array\n");
					heapify = false;
					break;
				}
				default:
					break;
				}
			} else {
				// End extract elements, end algorithm
				// sb.append("i < 0. End extract elements, end algorithm\n");
				heapify = false;
			}
		}
		}
		if (state.heapifyLength <= 0) {
			heapify = false;
			// sb.append("Heap is empty.\n");
		}
		if (heapify) {
			arrayView.selectElementWithColor(root, ElementView.BG_RED);
			int largest = root;
			int left = 2 * root + 1;
			int right = 2 * root + 2;

			if (left < state.heapifyLength) {
				arrayView.selectElementWithColor(left, ElementView.BG_CYAN);
				if (arrayView.getValueAt(left) > arrayView.getValueAt(largest)) {
					largest = left;
				}
			} else {
				// sb.append("Element " + array.getElementAt(root) + " has no left child.\n");
			}

			if (right < state.heapifyLength) {
				arrayView.selectElementWithColor(right, ElementView.BG_BLUE);
				if (arrayView.getValueAt(right) > arrayView.getValueAt(largest)) {
					largest = right;
				}
			} else {
				// sb.append("Element " + array.getElementAt(root) + " has no right child.\n");
			}

			// sb.append(
			// "Largest element between root, left child and right child: " +
			// array.getElementAt(largest) + "\n");
			if (largest != root) {
				// sb.append("Swap root " + array.getElementAt(root) + " with larger child " +
				// array.getElementAt(largest)
				// + "\n");
			} else {
				// sb.append("No swaps. Decrement i\n");
			}
		}
		// sb.append("Heap: " + array.toString(heapifyLength) + "\n");
		// sb.append("Sorted array: " + array.toString(heapifyLength,
		// array.getLength()));
	}
}
