package view.element;

import javafx.geometry.Pos;
import javafx.scene.control.Label;
import javafx.scene.layout.HBox;
import javafx.scene.text.Font;
import model.element.Element;

public class ElementView extends HBox {
	public static final String BG_WHITE = "-fx-background-color: white";
	public static final String BG_YELLOW = "-fx-background-color: #FBFFD1";
	public static final String BG_RED = "-fx-background-color: #CD6689";
	public static final String BG_CYAN = "-fx-background-color: #66BDCD";
	public static final String BG_BLUE = "-fx-background-color: #668ACD";
	public static final String BG_GREEN = "-fx-background-color: #66CDAA";

	public ElementView(Element element) {
		this.setAlignment(Pos.CENTER);
		setStyle(BG_WHITE);
		this.setPrefWidth(50);
		this.setPrefHeight(50);
		setMaxHeight(USE_PREF_SIZE);
		Label numLabel = new Label(String.valueOf(element.getValue()));
		numLabel.setFont(new Font("System", 20));
		getChildren().add(numLabel);
	}

	public void select(String colorStyle) {
		setStyle(colorStyle);
	}
}
