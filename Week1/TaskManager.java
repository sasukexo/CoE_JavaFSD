import java.util.PriorityQueue;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

class Task {
    private String id;
    private String description;
    private int priority;

    public Task(String id, String description, int priority) {
        this.id = id;
        this.description = description;
        this.priority = priority;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public int getPriority() {
        return priority;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", priority=" + priority +
                '}';
    }
}

class TaskManager {
    private PriorityQueue<Task> taskQueue;
    private Map<String, Task> taskMap;

    public TaskManager() {
        taskQueue = new PriorityQueue<>(Comparator.comparingInt(Task::getPriority).reversed());
        taskMap = new HashMap<>();
    }

    public void addTask(String id, String description, int priority) {
        Task newTask = new Task(id, description, priority);
        taskQueue.add(newTask);
        taskMap.put(id, newTask);
    }

    public void removeTask(String id) {
        Task task = taskMap.remove(id);
        if (task != null) {
            taskQueue.remove(task);
        }
    }

    public Task getHighestPriorityTask() {
        return taskQueue.peek();
    }

    public static void main(String[] args) {
        TaskManager manager = new TaskManager();

        manager.addTask("T1", "Complete project report", 3);
        manager.addTask("T2", "Prepare presentation", 2);
        manager.addTask("T3", "Email client updates", 1);

        System.out.println("Highest Priority Task: " + manager.getHighestPriorityTask());

        manager.removeTask("T2");

        System.out.println("Highest Priority Task after removal: " + manager.getHighestPriorityTask());
    }
}