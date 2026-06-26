package com.ems.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();

        // Allow static resources, auth check endpoints, and H2 console
        if (uri.equals("/") || uri.equals("/index.html") || uri.startsWith("/css/") || uri.startsWith("/js/") ||
            uri.startsWith("/api/auth/login") || uri.startsWith("/api/auth/status") || uri.startsWith("/h2-console")) {
            return true;
        }

        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") != null) {
            return true;
        }

        // If API call, return 401 Unauthorized
        if (uri.startsWith("/api/")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Unauthorized\"}");
        } else {
            // For pages or other assets, redirect to login page
            response.sendRedirect("/index.html");
        }
        return false;
    }
}
