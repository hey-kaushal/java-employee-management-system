# 🏢 Employee Management System (EMS)

<p align="center">
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-success?style=for-the-badge&logo=springboot" />
  <img src="https://img.shields.io/badge/Maven-Build-blue?style=for-the-badge&logo=apachemaven" />
  <img src="https://img.shields.io/badge/Hibernate-JPA-brown?style=for-the-badge&logo=hibernate" />
  <img src="https://img.shields.io/badge/Database-H2%20%7C%20MySQL-blue?style=for-the-badge&logo=mysql" />
</p>

<p align="center">
A modern Employee Management System built using <b>Spring Boot</b>, <b>Spring Data JPA</b>, and <b>Vanilla JavaScript</b> with secure session-based authentication and complete Employee & Department management.
</p>

---

## 📖 About the Project

The **Employee Management System (EMS)** is a full-stack web application developed to simplify employee and department management within an organization.

It provides a secure admin dashboard where administrators can:

* 🔐 Login securely
* 👨‍💼 Manage Employees
* 🏢 Manage Departments
* 📊 View organization statistics
* ⚡ Perform CRUD operations through REST APIs

The application follows a clean **3-Tier Architecture**, making it scalable, maintainable, and easy to extend.

---

# ✨ Features

### 🔐 Authentication

* Session-based Login
* Logout
* Protected REST APIs
* Unauthorized Access Handling

### 👨‍💼 Employee Management

* Add Employee
* Update Employee
* Delete Employee
* Search Employee
* View Employee Details
* Active / Inactive Status
* Full-Time / Part-Time Support

### 🏢 Department Management

* Add Department
* Edit Department
* Delete Department
* Department Listing

### 📊 Dashboard

* Employee Statistics
* Department Statistics
* Real-Time Data Cards

---

# 🛠 Tech Stack

| Category   | Technology                      |
| ---------- | ------------------------------- |
| Language   | Java 17                         |
| Backend    | Spring Boot 3                   |
| ORM        | Spring Data JPA, Hibernate      |
| Frontend   | HTML5, CSS3, Vanilla JavaScript |
| Database   | H2 Database, MySQL              |
| Build Tool | Maven                           |
| Server     | Embedded Tomcat                 |

---

# 🏗️ Architecture

```text
                +----------------------+
                |      Web Browser     |
                +----------+-----------+
                           |
                           |
             HTML • CSS • JavaScript
                           |
                           |
                    REST API Calls
                           |
                           ▼
                 Spring Boot Application
                           |
        +------------------+------------------+
        |                                     |
        ▼                                     ▼
 Authentication                    Business Logic
 (Session Based)                    Controllers
                           |
                           ▼
                 Spring Data JPA (Hibernate)
                           |
                           ▼
                  H2 Database / MySQL
```

---

# 📂 Project Structure

```text
java-employee-management-system
│
├── src
│   └── main
│       ├── java
│       │   └── com
│       │       └── ems
│       │
│       │           ├── config
│       │           │     ├── SeedConfig.java
│       │           │     └── WebConfig.java
│       │           │
│       │           ├── controller
│       │           │     ├── AuthController.java
│       │           │     ├── EmployeeController.java
│       │           │     └── DepartmentController.java
│       │           │
│       │           ├── interceptor
│       │           │     └── AuthInterceptor.java
│       │           │
│       │           ├── model
│       │           │     ├── Employee.java
│       │           │     └── Department.java
│       │           │
│       │           ├── repository
│       │           │     ├── EmployeeRepository.java
│       │           │     └── DepartmentRepository.java
│       │           │
│       │           └── EmsApplication.java
│       │
│       └── resources
│           ├── application.properties
│           ├── application-mysql.properties
│           └── static
│               ├── css
│               ├── js
│               ├── pages
│               └── index.html
│
├── pom.xml
└── README.md
```

---

# 🔑 REST APIs

## Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/login`  |
| POST   | `/api/auth/logout` |
| GET    | `/api/auth/status` |

---

## Employee

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | `/api/employees`      |
| GET    | `/api/employees/{id}` |
| POST   | `/api/employees`      |
| PUT    | `/api/employees/{id}` |
| DELETE | `/api/employees/{id}` |

---

## Department

| Method | Endpoint                |
| ------ | ----------------------- |
| GET    | `/api/departments`      |
| GET    | `/api/departments/{id}` |
| POST   | `/api/departments`      |
| PUT    | `/api/departments/{id}` |
| DELETE | `/api/departments/{id}` |

---

# 🚀 Getting Started

## Prerequisites

* Java JDK 17
* Apache Maven
* Git

---

## Clone Repository

```bash
git clone https://github.com/your-username/java-employee-management-system.git

cd java-employee-management-system
```

---

## Build Project

```bash
mvn clean package
```

---

## Run Application

```bash
java -jar target/employee-management-system-1.0.0.jar

```
```bash
mvn spring-boot:run
```

---


## Access Application

```text
http://localhost:8080
```

---

# 🔐 Demo Credentials

| Username | Password |
| -------- | -------- |
| admin    | admin123 |

---

# 💾 H2 Database

| Property | Value                              |
| -------- | ---------------------------------- |
| Console  | `http://localhost:8080/h2-console` |
| JDBC URL | `jdbc:h2:file:./data/ems`          |
| Username | `sa`                               |
| Password | *(blank)*                          |

---

# 🌟 Future Enhancements

* JWT Authentication
* Spring Security
* Docker Support
* Docker Compose
* Kubernetes Deployment
* Jenkins CI/CD
* SonarQube Integration
* Nexus Repository
* Trivy Security Scan
* Role-Based Access Control
* Email Notifications
* PDF Reports

---

# 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Kaushal**

B.Tech Information Technology Student

* 💻 Java Backend Developer
* 🌱 Learning DevOps & DevSecOps
* ☁️ Cloud Computing Enthusiast
* 🚀 Passionate about building scalable applications

---

<div align="center">

### ⭐ If you like this project, give it a Star!

Made with ❤️ using Java & Spring Boot

</div>
