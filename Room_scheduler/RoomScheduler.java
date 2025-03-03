import java.util.*;

// Room Scheduler Class
public class RoomScheduler {
    private final Map<String, MeetingRoom> meetingRooms = new HashMap<>();

    // Add a new meeting room
    public void addMeetingRoom(MeetingRoom room) {
        meetingRooms.put(room.roomId, room);
        System.out.println("Room added: " + room.roomName + ", ID: " + room.roomId);
    }

    // Book a meeting room if it matches required features
    public void bookRoom(String roomId, EnumSet<RoomFeature> requiredFeatures) {
        MeetingRoom room = meetingRooms.get(roomId);
        if (room != null && room.features.containsAll(requiredFeatures)) {
            System.out.println("Room " + roomId + " booked successfully.");
        } else {
            System.out.println("Room " + roomId + " does not meet the required features.");
        }
    }

    // List available rooms that match required features
    public void listAvailableRooms(EnumSet<RoomFeature> requiredFeatures) {
        List<String> availableRooms = new ArrayList<>();
        for (MeetingRoom room : meetingRooms.values()) {
            if (room.features.containsAll(requiredFeatures)) {
                availableRooms.add(room.roomName);
            }
        }
        System.out.println("Available rooms with " + requiredFeatures + ": " + availableRooms);
    }
}
