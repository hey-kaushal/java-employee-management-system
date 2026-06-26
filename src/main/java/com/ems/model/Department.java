package com.ems.model;

import jakarta.persistence.*;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    private String id; // Matches frontend e.g. 'd1', 'd2' or 'd' + timestamp

    private String name;
    private String icon;

    @Column(name = "description")
    private String desc; // Map desc -> description in database to avoid reserved word 'desc'

    // Constructors
    public Department() {
    }

    public Department(String id, String name, String icon, String desc) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.desc = desc;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
