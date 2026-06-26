package com.ems.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials, HttpServletRequest request) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        if ("admin".equals(username) && "admin123".equals(password)) {
            HttpSession session = request.getSession(true);
            session.setAttribute("user", username);
            return ResponseEntity.ok(Map.of("status", "success", "username", username));
        } else {
            return ResponseEntity.status(401).body(Map.of("status", "error", "message", "Invalid credentials"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @GetMapping("/status")
    public ResponseEntity<?> status(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            return ResponseEntity.ok(Map.of("authenticated", true, "username", session.getAttribute("user")));
        }
        return ResponseEntity.ok(Map.of("authenticated", false));
    }
}
