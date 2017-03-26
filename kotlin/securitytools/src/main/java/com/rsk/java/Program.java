package com.rsk.java;

import com.rsk.kotlin.Meeting;
import com.rsk.kotlin.MeetingException;

/**
 * Created by alex on 3/25/2017.
 */
public class Program {
    public static void main(String[] args) {
        Meeting board = new Meeting("Board Meeting");
        board.setLocation("London");

        System.out.println("Meeting is in: " + board.getLocation());

        board.description = "A board meeting";

        int version =Meeting.APP_VERSION;
        int appVersion = Meeting.getAppVersion();

        try {
            board.addAttendee("");
        }
        catch (MeetingException me){
            me.printStackTrace();
        }
    }
}
