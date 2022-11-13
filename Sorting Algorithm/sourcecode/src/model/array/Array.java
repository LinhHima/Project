package model.array;

import model.element.Element;

public class Array {
	private Element[] array;
	private int head = 0;

	/**
	 * Create an empty array with length
	 * 
	 * @param length
	 */
	public Array(int length) {
		array = new Element[length];
	}

	public Array(int[] nums) {
		array = new Element[nums.length];
		for (int num : nums) {
			push(num);
		}
	}

	/**
	 * Create an array with random values bounded by 0 and 100 (all inclusive)
	 * 
	 * @param length
	 * @return
	 */
	public static Array getRandomArray(int length) {
		Array array = new Array(length);
		for (int i = 0; i < length; i++) {
			array.push((int) (Math.random() * 100));
		}
		array.head = length;
		return array;
	}

	/**
	 * Append an element to the end of the array.
	 * 
	 * @param element
	 * @return length of the array
	 */
	public int push(int value) {
		if (head < array.length) {
			array[head] = new Element(head, value);
			head++;
		}
		return array.length;
	}

	public String toString(int from, int to) {
		StringBuilder sb = new StringBuilder();
		for (int i = from; i < to; i++) {
			sb.append(array[i] + " ");
		}
		return sb.toString();
	}

	public String toString(int numOfElements) {
		return toString(0, numOfElements);
	}

	@Override
	public String toString() {
		return toString(array.length);
	}

	public int getLength() {
		return array.length;
	}

	public Element getElementAt(int index) {
		return array[index];
	}

	public int getValueAt(int index) {
		return array[index].getValue();
	}

	public void setValueAt(int index, int value) {
		array[index].setValue(value);
	}

	/**
	 * Swap two elements at the specified indices.
	 * 
	 * @param index1
	 * @param index2
	 */
	public void swap(int index1, int index2) {
		if (index1 == index2)
			return;
		int temp = array[index1].getValue();
		array[index1].setValue(array[index2].getValue());
		array[index2].setValue(temp);
	}

	/**
	 * Check if array elements are sorted in increasing order
	 * 
	 * @return
	 */
	public boolean isIncreasing() {
		int prev = Integer.MIN_VALUE;
		for (Element elem : array) {
			if (elem.getValue() < prev)
				return false;
			prev = elem.getValue();
		}
		return true;
	}
}
