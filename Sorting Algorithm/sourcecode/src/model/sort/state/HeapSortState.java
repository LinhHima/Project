package model.sort.state;

public class HeapSortState extends SortState {
    public int heapifyLength;
	public int i;
	public int root;

	public boolean isOnlyHeapify = false;

	public HeapSortStep heapSortStep = HeapSortStep.BUILD_MAX_HEAP;

	public enum HeapSortStep {
		BUILD_MAX_HEAP, EXTRACT_ELEMENTS
	}

	public HeapSortExtractElementStep heapSortExtractElementStep = HeapSortExtractElementStep.SWAP_ROOT_WITH_LAST_ELEMENT;

	public enum HeapSortExtractElementStep {
		SWAP_ROOT_WITH_LAST_ELEMENT, EXTRACT_INTO_SORTED_ARRAY, HEAPIFY
	}
}
