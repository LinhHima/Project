package model.element;

public class Element {
	private int index;
	private int value;

	public Element(int index, int value) {
		this.index = index;
		this.value = value;
	}

	public int getValue() {
		return value;
	}

	public void setValue(int value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return index + "[" + value + "]";
	}
}
