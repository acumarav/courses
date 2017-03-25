package com.rsk.java;

import com.rsk.kotlin.Meeting;

/**
 * Created by alex on 3/25/2017.
 */
public class Program {
    public static void main(String[] args) {
        Meeting board = new Meeting("Board Meeting");
        board.setLocation("London");

        System.out.println("Meeting is in: " + board.getLocation());

        board.description = "A board meeting";
    }
}
