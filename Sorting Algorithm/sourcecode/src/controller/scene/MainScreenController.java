package controller.scene;

import java.io.IOException;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Alert.AlertType;
import javafx.scene.control.ButtonType;
import javafx.stage.Stage;

public class MainScreenController {
	private Stage stage;
	private Scene scene;
	private Parent root;

	@FXML
	void switchToSortScene(ActionEvent event) throws IOException {
		root = FXMLLoader.load(getClass().getResource("/controller/scene/SortScreen.fxml"));
		stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
		scene = new Scene(root);
		stage.setScene(scene);
		stage.show();
		stage.setOnCloseRequest(e -> {
			e.consume();
			logout();
		});
	}

	@FXML
	void quit(ActionEvent event) {
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setTitle("Logout");
		alert.setContentText("Do you want to proceed?");

		if (alert.showAndWait().get() == ButtonType.OK) {
			stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
			stage.close();
		}
	}

	void logout() {
		Alert alert = new Alert(AlertType.CONFIRMATION);
		alert.setTitle("Logout");
		alert.setContentText("Do you want to proceed?");

		if (alert.showAndWait().get() == ButtonType.OK) {
			stage.close();
		}
	}

}
