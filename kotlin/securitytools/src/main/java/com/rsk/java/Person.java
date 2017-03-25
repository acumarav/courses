package com.rsk.java;

import org.jetbrains.annotations.Nullable;

/**
 * Created by alex on 3/25/2017.
 */
public class Person {
    private String name;
    private int age;
    private Person partner;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if(name==null || "".equals(name)){
            throw new IllegalArgumentException();
        }
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Nullable
    public Person getPartner() {
        return partner;
    }

    public void setPartner(Person partner) {
        this.partner = partner;
    }
}
