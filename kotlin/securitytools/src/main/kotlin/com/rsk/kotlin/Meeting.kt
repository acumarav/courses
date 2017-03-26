package com.rsk.kotlin

/**
 * Created by alex on 3/25/2017.
 */
class Meeting(val title: String) {
    var location = ""
    @JvmField
    var description = ""

    @Throws(MeetingException::class)
    fun addAttendee(attendee: String){
        if(attendee.isNullOrBlank())throw MeetingException("Attendee Must have a name")
    }

    companion object {
        @JvmField
        var APP_VERSION = 1;

        @JvmStatic
        fun getAppVersion(): Int {
            return APP_VERSION;
        }
    }
}


class MeetingException(message: String) : Exception(message) {
}