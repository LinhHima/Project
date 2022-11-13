package view.array;

import java.util.Observable;

import exception.EmptyArrayException;
import exception.NegativeValueException;
import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.layout.HBox;
import javafx.util.Duration;
import model.array.Array;
import view.element.ElementView;
import view.sort.BubbleSortView;
import view.sort.HeapSortView;
import view.sort.ShellSortView;
import view.sort.SortView;

public class ArrayView extends Observable {
	private Array array;
	private HBox hbox = new HBox();

	private SortView bubbleSortView, heapSortView, shellSortView;
	private String selectedSort;

	private Timeline timeline;

	public ArrayView() {
		hbox.setAlignment(Pos.CENTER_LEFT);
		hbox.setSpacing(2);
		hbox.setPadding(new Insets(0, 0, 0, 20));

		// Setup sort animation
		timeline = new Timeline(new KeyFrame(Duration.seconds(1), e -> {
			if (array.isIncreasing()) {
				timeline.pause();
			}
			stepForward();
		}));
		timeline.setCycleCount(Animation.INDEFINITE);
	}

	public void createRandomArray(int length) throws NegativeValueException {
		if (length < 0)
			throw new NegativeValueException();
		array = Array.getRandomArray(length);
		initialize();
		setChanged();
		notifyObservers();
	}

	public void createInputArray(int[] nums) {
		array = new Array(nums);
		initialize();
		setChanged();
		notifyObservers();
	}

	private void initialize() {
		// Array is assumed to be not null
		bubbleSortView = new BubbleSortView(array, this);
		heapSortView = new HeapSortView(array, this);
		shellSortView = new ShellSortView(array, this);
	}

	public void checkNullArray() throws EmptyArrayException {
		if (array == null)
			throw new EmptyArrayException("Empty Array");
	}

	public int getArrayLength() {
		return array.getLength();
	}

	public int getValueAt(int index) {
		return array.getValueAt(index);
	}

	public void selectElementWithColor(int index, String color) {
		((ElementView) hbox.getChildren().get(index)).select(color);
	}

	public Node getViewBox() {
		hbox.getChildren().clear();
		for (int i = 0; i < array.getLength(); i++) {
			hbox.getChildren().add(new ElementView(array.getElementAt(i)));
		}
		return hbox;
	}

	public void setSort(String sortName) {
		selectedSort = sortName;
	}

	public void stepForward() {
		try {
			checkNullArray();
			if (selectedSort.equals("HeapSort")) {
				//In ra console
				System.out.println(heapSortView.printStateAsString());
				heapSortView.stepForward();
			} else if (selectedSort.equals("BubbleSort")) {
				System.out.println(bubbleSortView.printStateAsString());
				bubbleSortView.stepForward();
			} else if (selectedSort.equals("ShellSort")) {
				System.out.println(shellSortView.printStateAsString());
				shellSortView.stepForward();
			}
			setChanged();
			notifyObservers();
		} catch (EmptyArrayException e) {
			emptyArrayAlert();
		}
	}

	public void stepBackward() {
		try {
			checkNullArray();
			if (selectedSort.equals("HeapSort")) {
				System.out.println(heapSortView.printStateAsString());
				heapSortView.stepBackward();
			} else if (selectedSort.equals("BubbleSort")) {
				System.out.println(bubbleSortView.printStateAsString());
				bubbleSortView.stepBackward();
			} else if (selectedSort.equals("ShellSort")) {
				System.out.println(shellSortView.printStateAsString());
				shellSortView.stepBackward();
			}
			setChanged();
			notifyObservers();
		} catch (EmptyArrayException e) {
			emptyArrayAlert();
		}
	}

	public void sort() {
		try {
			checkNullArray();
			timeline.playFromStart();
		} catch (EmptyArrayException e) {
			emptyArrayAlert();
		}
	}

	public void stop() {
		timeline.stop();
	}

	public boolean isSortingDone() {
		return array.isIncreasing();
	}

	public static void emptyArrayAlert() {
		Alert alert = new Alert(AlertType.ERROR);
		alert.setTitle("Empty Array");
		alert.setContentText("Create an array to start sorting");
		alert.show();
	}

	public static void cannotStepBackwardFurtherAlert() {
		Alert alert = new Alert(AlertType.ERROR);
		alert.setTitle("Cannot step backward further");
		alert.setContentText("Array is at initial state");
		alert.show();
	}
}
