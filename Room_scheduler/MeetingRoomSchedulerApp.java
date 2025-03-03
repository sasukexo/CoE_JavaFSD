import java.util.*;
// MeetingRoomSchedulerApp.java
public class MeetingRoomSchedulerApp {
    public static void main(String[] args) {
        RoomScheduler scheduler = new RoomScheduler();
        
        
        scheduler.addMeetingRoom(new MeetingRoom("001", "Boardroom", 20, EnumSet.of(RoomFeature.PROJECTOR, RoomFeature.CONFERENCE_PHONE, RoomFeature.AIR_CONDITIONING)));
        scheduler.addMeetingRoom(new MeetingRoom("002", "Strategy Room", 10, EnumSet.of(RoomFeature.WHITEBOARD, RoomFeature.AIR_CONDITIONING)));
        
    
        scheduler.bookRoom("001", EnumSet.of(RoomFeature.PROJECTOR, RoomFeature.CONFERENCE_PHONE));
        
       
        scheduler.listAvailableRooms(EnumSet.of(RoomFeature.AIR_CONDITIONING));
    }
}
