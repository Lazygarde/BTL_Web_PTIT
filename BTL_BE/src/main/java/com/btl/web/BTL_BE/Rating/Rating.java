package com.btl.web.BTL_BE.Rating;

public class Rating {
    public int id;
    public int idBook;
    public int idUser;
    public int starCnt;
    public String comment;
    public String userName;

    public Rating(int id, int idBook, int idUser, int starCnt, String comment, String userName) {
        this.id = id;
        this.idBook = idBook;
        this.idUser = idUser;
        this.starCnt = starCnt;
        this.comment = comment;
        this.userName = userName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdBook() {
        return idBook;
    }

    public void setIdBook(int idBook) {
        this.idBook = idBook;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getStarCnt() {
        return starCnt;
    }

    public void setStarCnt(int starCnt) {
        this.starCnt = starCnt;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    

    
}
