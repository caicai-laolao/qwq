package com.example;

public class RunUser {
    public RunUser(int age, String name) {
        this.name = age + "岁的" + name + "在跑步";
    }

    public String name = "hh";
    public int age = 999;

    public String getName() {

        return this.name;

    }

}
