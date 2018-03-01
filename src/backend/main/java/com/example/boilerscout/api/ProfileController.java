package com.example.boilerscout.api;

import io.jsonwebtoken.JwtException;
import javafx.application.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by terrylam on 3/1/18.
 */

@Service
public class ProfileController extends ValidateUser {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Map<String, Object> updateProfile(@RequestBody Map<String, Object> body) {

        Map<String, Object> response = new HashMap<String, Object>();

        //Perform user validation
        String userId = body.get("userId").toString();
        String token = body.get("token").toString();

        try {
            isValidToken(token, userId);
            isExpiredToken(token);
        } catch (JwtException ex) {
            log.info("Exception Message" + ex.getMessage());
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            throw new RuntimeException("[InternalServerError] - Error validating JWT.");
        }







        response.put("status", "This is a valid call!!");
        return response;
    }


}
