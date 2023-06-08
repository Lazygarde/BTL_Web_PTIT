package com.btl.web.BTL_BE.Order;

public class Order {

    public int id;
    public int idUser;
    public int idBook;
    public int sum;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdBook() {
        return idBook;
    }

    public void setIdBook(int idBook) {
        this.idBook = idBook;
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }

    public Order(int id, int idUser, int idBook, int sum) {
        this.id = id;
        this.idUser = idUser;
        this.idBook = idBook;
        this.sum = sum;
    }

}
