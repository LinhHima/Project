package controller.scene;

import java.io.IOException;
import java.net.URL;
import java.util.Observable;
import java.util.Observer;
import java.util.ResourceBundle;

import controller.dialog.CreateArrayDialogController;
import exception.EmptyArrayException;
import exception.NegativeValueException;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextField;
import javafx.scene.control.ToggleGroup;
import javafx.scene.layout.HBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import view.array.ArrayView;

@SuppressWarnings("deprecation")
public class SortScreenController implements Observer, Initializable {
	private ArrayView arrayView = new ArrayView();

	public SortScreenController() {
		arrayView.addObserver(this);
	}

	@Override
	public void update(Observable o, Object arg) {
		displayBox.getChildren().clear();
		displayBox.getChildren().addAll(arrayView.getViewBox());
	}

	@FXML
	private HBox displayBox;

	@FXML
	private ToggleGroup toggleSortOption;

	@FXML
	private RadioButton heapRadioButton, bubbleRadioButton, shellRadioButton;

	@FXML
	private Button stopButton;

	@FXML
	void getRandomArray(ActionEvent event) throws IOException {
		// Click button "Random values" hiện thị dialog để nhập độ dài mảng
		FXMLLoader loader = new FXMLLoader(getClass().getResource("/controller/dialog/CreateRandomArrayDialog.fxml"));
		Stage stage = new Stage();
		loader.setController(new CreateArrayDialogController() {
			@FXML
			private TextField inputLengthField;

			@FXML
			private Label randomArrayLabel;

			@Override
			@FXML
			public void submit(ActionEvent event) {
				try {
					int length = Integer.parseInt(inputLengthField.getText());
					arrayView.createRandomArray(length);
					stage.close();
				} catch (NumberFormatException e) {
					randomArrayLabel.setText("Not a number");
				} catch (NegativeValueException e) {
					randomArrayLabel.setText("Enter positive number");
				}
			}
		});
		Parent parent = loader.load(); 
		Scene scene = new Scene(parent);
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.setScene(scene);
		stage.showAndWait();
		updateSortSelected();
	}

	@FXML
	void getInputArray(ActionEvent event) throws IOException {
		FXMLLoader loader = new FXMLLoader(getClass().getResource("/controller/dialog/CreateInputArrayDialog.fxml"));
		Stage stage = new Stage();
		loader.setController(new CreateArrayDialogController() {
			@FXML
			private Label inputArrayLabel;

			@FXML
			private TextField inputValuesField;

			@Override
			@FXML
			public void submit(ActionEvent event) {
				try {
					String numsStr[] = inputValuesField.getText().split("\\s+");
					int nums[] = new int[numsStr.length];
					for (int i = 0; i < nums.length; i++)
						nums[i] = Integer.parseInt(numsStr[i]);
					arrayView.createInputArray(nums);
				} catch (NumberFormatException e) {
					inputArrayLabel.setText("Enter only numbers seperated by spaces");
				}
			}
		});
		Parent parent = loader.load();
		Scene scene = new Scene(parent);
		stage.initModality(Modality.APPLICATION_MODAL);
		stage.setScene(scene);
		stage.showAndWait();
		updateSortSelected();
	}

	@FXML
	void selectSort(ActionEvent event) {
		updateSortSelected();
	}

	void updateSortSelected() {
		stopButton.setVisible(false);
		try {
			arrayView.checkNullArray();
		} catch (EmptyArrayException e) {
			// Do nothing
		}

		if (heapRadioButton.isSelected())
			arrayView.setSort("HeapSort");
		else if (bubbleRadioButton.isSelected())
			arrayView.setSort("BubbleSort");
		else if (shellRadioButton.isSelected())
			arrayView.setSort("ShellSort");
	}

	@FXML
	void stepForwardButtonPressed(ActionEvent event) {
		updateSortSelected();
		arrayView.stepForward();
	}

	@FXML
	void stepBackwardButtonPressed(ActionEvent event) {
		updateSortSelected();
		arrayView.stepBackward();
	}

	@FXML
	void sortButtonPressed(ActionEvent event) {
		updateSortSelected();
		stopButton.setVisible(true);
		arrayView.sort();
	}

	@FXML
	void stopButtonPressed(ActionEvent event) {
		arrayView.stop();
	}

	@Override
	public void initialize(URL location, ResourceBundle resources) {
		updateSortSelected();
		stopButton.setVisible(false);
	}

	@FXML
	void helpMenuButtonPressed(ActionEvent event) throws IOException {
		Stage stage = new Stage();
		stage.setTitle("Help Menu");
		Parent root = FXMLLoader.load(this.getClass().getResource("/controller/dialog/HelpMenu.fxml"));
		Scene scene = new Scene(root);
		stage.setScene(scene);
		stage.show();
	}
}
