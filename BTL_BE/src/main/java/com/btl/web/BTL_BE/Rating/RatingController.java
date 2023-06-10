package com.btl.web.BTL_BE.Rating;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class RatingController {
    
    private RatingDAO ratingDAO = new RatingDAO();

    @GetMapping("rating")
    public ResponseEntity<?> getAllRating() {
        return ratingDAO.selectAllRating();
    }

    @GetMapping("rating/id")
    public ResponseEntity<?> getRatingByUserIdAndBookId(@RequestParam("idUser") String idUser,
            @RequestParam("idBook") String idBook) {
        return ratingDAO.selectRatingByBookIdAndUserId(idBook, idUser);
    }

    @GetMapping("rating/idBook")
    public ResponseEntity<?> getRatingByBookId(@RequestParam("idBook") String idBook) {
        return ratingDAO.selectRatingByBookId(idBook);
    }
    

    @GetMapping("rating/{id}")
    public ResponseEntity<?> getRatingById(@PathVariable String id) {
        return ratingDAO.selectRating(id);
    }

    @DeleteMapping("rating/{id}")
    public ResponseEntity<?> deleteRatingById(@PathVariable String id) {
        boolean deteted = ratingDAO.deleteRating(id);
        if (deteted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rating not found");
        }
    }

    @PutMapping("rating/{id}")
    public ResponseEntity<?> updateRatingById(@PathVariable String id, @RequestBody Rating rating) {
        boolean updated = ratingDAO.updateRating(id, rating);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rating not found");
        }
    }
    @PostMapping("rating")
    public ResponseEntity<?> insertRating(@RequestBody Rating rating) {
        Rating insertedRating = ratingDAO.addRating(rating);
        if (insertedRating != null) {
            return ResponseEntity.ok().body(insertedRating);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Rating not found");
        }
    }

}
