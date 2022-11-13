package view.sort;

import java.util.EmptyStackException;

import javafx.animation.KeyFrame;
import javafx.animation.Timeline;
import javafx.util.Duration;
import model.sort.Sort;
import view.array.ArrayView;
import view.element.ElementView;

public abstract class SortView {
	protected ArrayView arrayView;
	protected Sort algorithm;
	protected Timeline stepForwardTimeline;

	public SortView(ArrayView arrayView, Sort algorithm) {
		this.arrayView = arrayView;
		this.algorithm = algorithm;

		stepForwardTimeline = new Timeline(new KeyFrame(Duration.seconds(0.0), e -> {
			selectElements();
		}), new KeyFrame(Duration.seconds(0.3), e -> {
			algorithm.stepForward();
		}));
		stepForwardTimeline.setCycleCount(1);
	}

	public void stepForward() {
		stepForwardTimeline.play();
	}

	public void stepBackward() {
		// TODO: Step backward animation timeline
		try {
			algorithm.stepBackward();
		} catch (EmptyStackException e) {
			ArrayView.cannotStepBackwardFurtherAlert();
		}
	}

	public abstract void selectElements();

	public void displaySortSuccess(int from) {
		for (int i = from; i < arrayView.getArrayLength(); i++)
			arrayView.selectElementWithColor(i, ElementView.BG_GREEN);
	}

	public String printStateAsString() {
		return algorithm.printStateAsString();
	}
}
