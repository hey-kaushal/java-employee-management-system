package com.ems.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String gender;
    private String dept;
    private String role;
    private Double salary;
    private String type;
    private String status;
    private LocalDate joined;

    // Constructors
    public Employee() {
    }

    public Employee(String name, String email, String phone, String gender, String dept, String role, Double salary, String type, String status, LocalDate joined) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.dept = dept;
        this.role = role;
        this.salary = salary;
        this.type = type;
        this.status = status;
        this.joined = joined;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getJoined() {
        return joined;
    }

    public void setJoined(LocalDate joined) {
        this.joined = joined;
    }
}
