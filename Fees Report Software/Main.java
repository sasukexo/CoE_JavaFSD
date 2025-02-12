package Fee_Report_Software;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        boolean exit = true;
        
        while (exit) {
            System.out.println("----- Fee Report System -----");
            System.out.println("1. Admin Login");
            System.out.println("2. Accountant Login");
            System.out.println("3. Exit");
            System.out.print("\nChoose an option: ");
            
            int n = sc.nextInt();
            sc.nextLine();  
            
            switch (n) {
                case 1:
                    AdminUI adminUI = new AdminUI();
                    adminUI.start();
                    break;
                
                case 2:
                    AccountantUI accountantUI = new AccountantUI();
                  
                    break;
                
                case 3:
                    exit = false;
                    break;
                
                default:
                    System.out.println("Invalid Number. Please choose a valid option.");
            }
        }        
        System.out.println("Thank you!");
     
    }
}
