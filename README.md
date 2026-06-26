# 🏢 Employee Management System

Full-stack Java Spring Boot application with complete DevOps pipeline.

## Tech Stack
- **Backend**: Spring Boot 3.x, Spring Data JPA, Spring Security
- **Database**: MySQL 8
- **Build**: Maven
- **CI/CD**: Jenkins
- **Code Quality**: SonarQube
- **Containerisation**: Docker + Docker Compose
- **Orchestration**: Kubernetes (AWS EKS)
- **IaC**: Terraform + Ansible
- **Reverse Proxy**: Nginx
- **Monitoring**: Prometheus + Grafana

## API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get by ID |
| POST | `/api/employees` | Create employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

## Running Locally
```bash
# With Docker Compose
docker compose up -d

# Without Docker
mvn clean package
java -jar target/employee-management-system.jar
```

## CI/CD Pipeline
`GitHub Push → Jenkins → Maven Build → SonarQube → Docker Build → Push to ECR → Deploy to EKS`
