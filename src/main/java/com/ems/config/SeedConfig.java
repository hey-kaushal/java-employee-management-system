package com.ems.config;

import com.ems.model.Department;
import com.ems.model.Employee;
import com.ems.repository.DepartmentRepository;
import com.ems.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class SeedConfig {

    @Bean
    CommandLineRunner initDatabase(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        return args -> {
            if (departmentRepository.count() == 0) {
                departmentRepository.save(new Department("d1", "Engineering", "💻", "Software development & QA"));
                departmentRepository.save(new Department("d2", "Marketing", "📣", "Brand, content & campaigns"));
                departmentRepository.save(new Department("d3", "HR", "🤝", "Talent & people operations"));
                departmentRepository.save(new Department("d4", "Finance", "💰", "Accounts & financial planning"));
                departmentRepository.save(new Department("d5", "Operations", "⚙️", "Logistics & process management"));
                departmentRepository.save(new Department("d6", "Design", "🎨", "UI/UX & brand identity"));
            }

            if (employeeRepository.count() == 0) {
                employeeRepository.save(new Employee("Priya Sharma", "priya@company.com", "9876543210", "Female", "Engineering", "Senior Developer", 95000.0, "Full-Time", "active", LocalDate.parse("2021-03-15")));
                employeeRepository.save(new Employee("Rahul Gupta", "rahul@company.com", "9123456789", "Male", "Marketing", "Marketing Lead", 72000.0, "Full-Time", "active", LocalDate.parse("2020-07-01")));
                employeeRepository.save(new Employee("Anita Desai", "anita@company.com", "9988776655", "Female", "HR", "HR Manager", 68000.0, "Full-Time", "active", LocalDate.parse("2019-11-20")));
                employeeRepository.save(new Employee("Vikram Mehta", "vikram@company.com", "9871234567", "Male", "Finance", "Finance Analyst", 78000.0, "Full-Time", "inactive", LocalDate.parse("2022-01-10")));
                employeeRepository.save(new Employee("Sunita Patel", "sunita@company.com", "9765432109", "Female", "Design", "UI/UX Designer", 82000.0, "Full-Time", "active", LocalDate.parse("2021-08-25")));
                employeeRepository.save(new Employee("Arjun Singh", "arjun@company.com", "9654321098", "Male", "Operations", "Ops Manager", 89000.0, "Full-Time", "active", LocalDate.parse("2020-03-11")));
                employeeRepository.save(new Employee("Meera Joshi", "meera@company.com", "9543210987", "Female", "Engineering", "QA Engineer", 74000.0, "Full-Time", "active", LocalDate.parse("2022-06-01")));
                employeeRepository.save(new Employee("Kiran Kumar", "kiran@company.com", "9432109876", "Male", "Marketing", "Content Writer", 55000.0, "Part-Time", "inactive", LocalDate.parse("2023-01-15")));
                employeeRepository.save(new Employee("Deepa Nair", "deepa@company.com", "9321098765", "Female", "Engineering", "DevOps Engineer", 91000.0, "Full-Time", "active", LocalDate.parse("2021-11-08")));
                employeeRepository.save(new Employee("Rohit Verma", "rohit@company.com", "9210987654", "Male", "Finance", "Accountant", 61000.0, "Full-Time", "active", LocalDate.parse("2023-04-20")));
            }
        };
    }
}
