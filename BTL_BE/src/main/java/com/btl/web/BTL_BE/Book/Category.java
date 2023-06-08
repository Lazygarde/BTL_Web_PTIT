package com.btl.web.BTL_BE.Book;

public class Category {

    private int id;
    private String name;

    public Category() {
    }

    public Category(int iD, String nameCategory) {
        super();
        id = iD;
        name = nameCategory;
    }

    public int getID() {
        return id;
    }

    public void setID(int iD) {
        iD = iD;
    }

    public String getName() {
        return name;
    }

    public void setName(String nameCategory) {
        name = nameCategory;
    }

}
