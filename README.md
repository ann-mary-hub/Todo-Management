# Project Title

A web application to manage projects and export them as Gists on GitHub
## Features
- Create and manage projects.
- Add, update, and manage todos for each project.
- Export project summaries as Gists on GitHub.
- Download exported Gists locally as Markdown files.

---


 ## Backend Structure
Backend/
├── src/main/java/com/todo/Management
│   ├── Configuration     # Security Configurations
│   ├── controller        # REST controllers
│   ├── service           # Business logic
│   ├── Entity            # Entities 
│   └── repository        # Data access layer
└── src/main/resources    # Configurations


## Frontend Structure
frontend/
├── src
│   ├── components         # React components
│   ├── App.js             # Routes
└────── public             # Static assets

## Prerequisites
- **Backend**
  - Java (JDK 11 or higher)
  - Spring Boot
  - Maven
- **Frontend**
  - Node.js (v14 or higher)
  - npm or yarn
- **Database**
  - A running instance of PostgreSQL.

---

## Backend Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:ann-mary-hub/Todo-Management.git
   cd Todo-Management/Backend/Management

2. **Application Properties:**
    ```bash
    spring.datasource.url=jdbc:mysql://localhost:5434/your-database
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    github.token=your-github-personal-access-token

3. **Run the backend:**
    ```bash
    mvn clean install
    mvn spring-boot:run
   The backend will run at http://localhost:8083.
---

## Frontend Setup

1. **Navigate to frontend directory:**
    ```bash
    cd Frontend/todo-management

2.  **Install dependencies:**
    ```bash
        npm install

3. **Run the frontend:**
    ```bash
         npm start
         The frontend will run at http://localhost:3000.

4. **To login use credentials**
    ```bash
        username : Admin
        password : password




