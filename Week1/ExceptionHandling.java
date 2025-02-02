import java.util.Scanner;

public class ExceptionHandling {
    public static void processInput() {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            try {
                System.out.print("Enter a number: ");
                double num = scanner.nextDouble();
                double reciprocal = 1 / num;
                System.out.println("Reciprocal: " + reciprocal);
                break;
            } catch (java.util.InputMismatchException e) {
                System.out.println("Invalid input. Please enter a numerical value.");
                scanner.next();
            } catch (ArithmeticException e) {
                System.out.println("Cannot divide by zero. Enter a non-zero number.");
            }
        }
        scanner.close();
    }

    public static void main(String[] args) {
        processInput();
    }
}
