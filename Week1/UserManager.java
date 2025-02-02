import java.io.*;
import java.util.ArrayList;
import java.util.List;

class User {
    private String name;
    private String email;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "'}";
    }
}

public class UserManager {
    private List<User> users;

    public UserManager() {
        users = new ArrayList<>();
    }

    // Adds a user to the system
    public void addUser(String name, String email) {
        users.add(new User(name, email));
    }

    // Saves all user details to a file
    public void saveUsersToFile(String filename) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (User user : users) {
                writer.write(user.getName() + "," + user.getEmail());
                writer.newLine();
            }
            System.out.println("User details saved to " + filename);
        } catch (IOException e) {
            System.err.println("Error saving users to file: " + e.getMessage());
        }
    }

    // Loads user details from a file
    public void loadUsersFromFile(String filename) {
        users.clear(); // Clear existing users before loading
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                if (parts.length == 2) {
                    users.add(new User(parts[0], parts[1]));
                }
            }
            System.out.println("User details loaded from " + filename);
        } catch (IOException e) {
            System.err.println("Error loading users from file: " + e.getMessage());
        }
    }

    // Displays all users in the system
    public void displayUsers() {
        if (users.isEmpty()) {
            System.out.println("No users available.");
        } else {
            for (User user : users) {
                System.out.println(user);
            }
        }
    }

    public static void main(String[] args) {
        UserManager userManager = new UserManager();

        // Adding users
        userManager.addUser("Aswin", "sasuke@a.com");
        userManager.addUser("Inosuke", "inosuke@naruto.com");

        // Saving users to a file
        userManager.saveUsersToFile("users.txt");

        // Loading users from the file
        userManager.loadUsersFromFile("users.txt");

        // Displaying loaded users
        userManager.displayUsers();
    }
}