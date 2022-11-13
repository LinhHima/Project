package console;

import java.util.Scanner;

import model.array.Array;
import model.sort.BubbleSort;
import model.sort.HeapSort;
import model.sort.ShellSort;
import model.sort.Sort;

public class Main {

	private static Scanner keyboard = new Scanner(System.in);

	private static Array array = new Array(0);

	private static void defaultOption() {
		System.out.println("Invalid option");
	}

	private static void mainMenu() {
		System.out.println("Current array: " + array.toString());
		System.out.println("Main menu");
		System.out.println("--------------------------------");
		System.out.println("1. Create array");
		System.out.println("2. Run a sort algorithm");
		System.out.println("3. Help");
		System.out.println("0. Exit");
		System.out.println("--------------------------------");
		System.out.println("Please choose a number: 0 - 1 - 2 - 3");
	}

	public static void main(String[] args) {
		runConsole();
	}

	private static void runConsole() {
		int mainMenuOption = -1;
		while (mainMenuOption != 0) {
			mainMenu();
			mainMenuOption = keyboard.nextInt();
			switch (mainMenuOption) {
			case 1:
				createArray();
				break;
			case 2:
				runSort();
				break;
			case 3:
				help();
				break;
			case 0:
				System.out.println("Goodbye!");
				break;
			default:
				defaultOption();
			}
		}
	}

	private static void createArrayMenu() {
		System.out.println("Current array: " + array.toString());
		System.out.println("Create array menu");
		System.out.println("--------------------------------");
		System.out.println("1. Create array with random values");
		System.out.println("2. Create array with user input values");
		System.out.println("0. Return to console menu");
		System.out.println("--------------------------------");
		System.out.println("Please choose a number: 0 - 1 - 2");
	}

	private static void createArray() {
		int createArrayOption = -1;
		while (createArrayOption != 0) {
			createArrayMenu();
			createArrayOption = keyboard.nextInt();
			switch (createArrayOption) {
			// Create array with random values
			case 1:
				System.out.println("Please enter the length of the array: ");
				array = Array.getRandomArray(keyboard.nextInt());
				createArrayOption = 0;
				break;
			// Create array with user input values
			case 2:
				System.out.println("Please enter the length of the array: ");
				int length = keyboard.nextInt();
				array = new Array(length);
				System.out.println("Please enter the values of the array: ");
				for (int i = 0; i < length; i++) {
					array.push(keyboard.nextInt());
				}
				createArrayOption = 0;
				break;
			case 0:
				break;
			default:
				defaultOption();
			}
		}
	}

	private static void runSortMenu() {
		System.out.println("Current array: " + array.toString());
		System.out.println("Run sort menu");
		System.out.println("--------------------------------");
		System.out.println("1. Bubble sort");
		System.out.println("2. Heap sort");
		System.out.println("3. Shell sort");
		System.out.println("0. Return to console menu");
		System.out.println("--------------------------------");
		System.out.println("Please choose a number: 0 - 1 - 2 - 3");
	}

	private static void runSort() {
		int runSortOption = -1;
		while (runSortOption != 0) {
			runSortMenu();
			runSortOption = keyboard.nextInt();
			Sort sort;
			switch (runSortOption) {
			// Bubble sort
			case 1:
				sortByStep(new BubbleSort(array));
				runSortOption = 0;
				break;
			// Heap sort
			case 2:
				sortByStep(new HeapSort(array));
				runSortOption = 0;
				break;
			// Shell sort
			case 3:
				sortByStep(new ShellSort(array));
				runSortOption = 0;
				break;
			case 0:
				break;
			default:
				defaultOption();
			}
		}
	}

	private static void help() {

	}

	private static void sortByStepMenu() {
		System.out.println("Current array: " + array.toString());
		System.out.println("Current array is sorted? " + array.isIncreasing());
		System.out.println("Sort step menu");
		System.out.println("--------------------------------");
		System.out.println("1. Step forwards");
		System.out.println("2. Step backwards");
		System.out.println("0. Return");
		System.out.println("--------------------------------");
		System.out.println("Please choose a number: 0 - 1 - 2");
	}

	private static void sortByStep(Sort algorithm) {
		int sortByStepOption = -1;
		while (sortByStepOption != 0) {
			System.out.println("Running algorithm: " + algorithm.toString());
			System.out.println(algorithm.getState());
			sortByStepMenu();
			sortByStepOption = keyboard.nextInt();
			switch (sortByStepOption) {
			// Step forwards
			case 1:
				algorithm.stepForward();
				break;
			// Step backwards
			case 2:
				algorithm.stepBackward();
				break;
			case 0:
				break;
			default:
				defaultOption();
			}
		}
	}
}
