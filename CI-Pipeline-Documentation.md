
# 🚀 Employee Management System - DevSecOps CI Pipeline

> **A complete DevSecOps Continuous Integration (CI) Pipeline using GitHub, GitLeaks, Jenkins, Maven, SonarQube, Snyk, Trivy, Nexus Repository, Docker and Docker Hub.**

---

# 📖 Project Overview

This project demonstrates a production-ready CI pipeline for a Spring Boot Employee Management System. It automates building, testing, security scanning, artifact management and containerization using Jenkins.

## Pipeline Features

- Source Code Management with GitHub
- Jenkins CI Pipeline
- GitLeaks Secret Detection
- Maven Build & Unit Testing
- SonarQube Static Code Analysis
- Snyk Dependency Scanning
- Trivy File System Scan
- Maven Packaging
- Nexus Artifact Repository
- Docker Image Build
- Trivy Docker Image Scan
- Docker Hub Push

---

# 🏗 Architecture

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Jenkins
    │
    ▼
Git Checkout
    │
    ▼
GitLeaks Scan
    │
    ▼
Compile
    │
    ▼
Unit Test
    │
    ▼
SonarQube Analysis
    │
    ▼
Snyk Dependency Scan
    │
    ▼
Trivy File System Scan
    │
    ▼
Package (JAR)
    │
    ▼
Upload Artifact to Nexus
    │
    ▼
Docker Image Build
    │
    ▼
Trivy Docker Image Scan
    │
    ▼
Push Image to Docker Hub
    │
    ▼
Pipeline Success ✅
```

---

# 🛠 Tech Stack

| Category | Tool |
|-----------|------|
| Source Control | GitHub |
| CI | Jenkins |
| Language | Java 21 |
| Build Tool | Maven |
| Framework | Spring Boot |
| SAST | SonarQube |
| Secret Scan | GitLeaks |
| Dependency Scan | Snyk |
| Vulnerability Scan | Trivy |
| Artifact Repository | Nexus |
| Containerization | Docker |
| Registry | Docker Hub |
| Cloud | AWS EC2 |

---

# 📌 EC2 Instance Configuration

Instance Type

```
c7i-flex.large    2 cpu ,4gb ram
```

Storage

```
30 GB
```

Operating System

```
Ubuntu latesh
```

# Security Group Ports

| Port       | Protocol | Purpose                                |
| ---------- | -------- | -------------------------------------- |
| 22         | TCP      | SSH Access                             |
| 80         | TCP      | HTTP                                   |
| 443        | TCP      | HTTPS                                  |
| 8080       | TCP      | Spring Boot Application                |
| 9001       | TCP      | SonarQube Dashboard                    |
| 27017      | TCP      | MongoDB *(Optional)*                   |
| 25         | TCP      | SMTP                                   |
| 465        | TCP      | Secure SMTP (SSL)                      |
| 3000–10000 | TCP      | Custom Application & Development Ports |

---

# 📋 Prerequisites

- AWS EC2 Ubuntu Server
- Java 21
- Git
- Maven latesh version
- Docker
- Jenkins
- SonarQube
- Nexus Repository
- GitLeaks
- Trivy
- Snyk CLI
- Docker Hub Account
- GitHub Account

---

# ⚙ Installation Guide

## 1. Install Java

```bash
sudo apt update
sudo apt install openjdk-21-jdk -y
java -version
```

## 2. Install Git

```bash
sudo apt install git -y
git --version
```

## 3. Install Maven

```bash
sudo apt install maven -y
mvn -version
```

## 4. Install Docker

```bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

## 5. Install Jenkins

Install Jenkins from the official repository and verify:

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

## 6. Install SonarQube in differnt vm same confi 2 cpu ,4 gb ram port enable 9000,ssh,http,https and install docker

 
```bash
docker pull sonarqube:lts-community
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

## 7. Install Nexus in differnt vm same confi 2 cpu ,4 gb ram port enable 8081,ssh,http,https and install docker


```bash
docker pull sonatype/nexus3
docker run -d --name nexus -p 8081:8081 sonatype/nexus3
```
 

## 8. Install GitLeaks

```bash
gitleaks version
```

## 9. Install Trivy

```bash
trivy --version
```

## 10. Install Snyk

```bash
npm install -g snyk
snyk auth
```

---

# 🔧 Jenkins Configuration

Configure:

- JDK 21
- Maven
- Git
- SonarQube Server
- Docker
- GitHub Credentials
- Docker Hub Credentials
- Snyk Token
- Nexus Credentials

Required Plugins:

- Git
- Pipeline
- Maven Integration
- Docker
- Docker Pipeline
- SonarQube Scanner
- Credentials Binding
- Config File Provider

---

# 🚀 Pipeline Stages

| Stage | Description |
|--------|-------------|
| Git Checkout | Clone source code |
| GitLeaks | Detect hardcoded secrets |
| Compile | Compile Java application |
| Unit Test | Execute JUnit tests |
| SonarQube | Analyze code quality |
| Snyk | Scan dependencies |
| Trivy FS | Scan project filesystem |
| Package | Generate executable JAR |
| Nexus | Upload artifact |
| Docker Build | Build Docker image |
| Trivy Image | Scan Docker image |
| Docker Hub | Push image |

---

# 📄 Jenkinsfile

Replace this section with your actual Jenkinsfile.

```groovy
pipeline {
    agent any

    tools {
        jdk 'java21'
        maven 'maven'
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hey-kaushal/java-employee-management-system.git'
            }
        }

        stage('Compile') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Trivy File System Scan') {
            steps {
                sh '''
                    trivy fs \
                    --format template \
                    --template "@/usr/local/share/html.tpl" \
                    -o trivy-fs-report.html .
                '''
            }
        }

        
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarserver') {
                    sh 'mvn sonar:sonar'
                }
            }
        }
        

        stage('Package') {
            steps {
                sh 'mvn package'
            }
        }

        
        stage('Deploy to Nexus') {
            steps {
                withMaven(
                    globalMavenSettingsConfig: 'maven-setting-json-file',
                    traceability: true
                ) {
                    sh 'mvn deploy'
                }
            }
        }
        

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t kaushalx21/ems:v1 .'
            }
        }
/*
        stage('Trivy Image Scan') {
    steps {
        sh 'trivy image kaushalx21/ems:v1'
    }
}
*/
        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push kaushalx21/ems:v1'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: '*.html', fingerprint: true
        }
    }
}
```

---

# 📊 Reports

- SonarQube Dashboard
- GitLeaks Report
- Snyk Report
- Trivy FS Report
- Trivy Image Report

---

# 📸 Screenshots

Add screenshots for:

- Jenkins Dashboard
- Plugins
- Tool Configuration
- Successful Pipeline
- SonarQube Dashboard
- Nexus Repository
- Docker Image
- Docker Hub Repository
- Trivy Reports

---

# 🐞 Common Issues

| Issue | Solution |
|------|----------|
| Jenkins Node Offline | Restart Jenkins / reconnect node |
| Docker Permission Denied | Add Jenkins user to docker group |
| SonarQube Not Running | Restart container |
| Nexus Upload Failed | Verify credentials |
| Snyk Authentication Failed | Run `snyk auth` |
| Trivy DB Error | Update Trivy DB |

---

# 📚 Learning Outcomes

- CI Pipeline Design
- Jenkins Automation
- DevSecOps Best Practices
- Secret Detection
- Static Code Analysis
- Dependency Scanning
- Container Security
- Artifact Management
- Docker Image Publishing

---

# 🚀 Future Improvements

- Kubernetes Deployment
- Argo CD
- Helm
- Prometheus
- Grafana
- Slack Notifications
- Email Notifications

---

# 👨‍💻 Author

**Kaushal Sahni**

B.Tech Information Technology

DevOps | DevSecOps | AWS | Docker | Jenkins | Java | Spring Boot

---

⭐ If you found this project useful, consider giving it a star.
