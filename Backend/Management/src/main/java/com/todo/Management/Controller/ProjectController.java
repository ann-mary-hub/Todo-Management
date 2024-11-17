package com.todo.Management.Controller;

// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.todo.Management.Entity.Project;
// import com.todo.Management.Service.ProjectService;

// @RestController
// @RequestMapping("/api/projects")
// public class ProjectController {

//     @Autowired
//     private ProjectService projectService;

//     // Create a new project
//     @PostMapping
//     public ResponseEntity<Project> createProject(@RequestBody Project project) {
//         Project createdProject = projectService.createProject(project.getTitle());
//         return ResponseEntity.ok(createdProject);
//     }

//     // List all projects
//     @GetMapping
//     public ResponseEntity<List<Project>> listAllProjects() {
//         List<Project> projects = projectService.listAllProjects();
//         return ResponseEntity.ok(projects);
//     }

//     // View a specific project
//     @GetMapping("/{project_id}")
//     public ResponseEntity<Project> getProjectById(@PathVariable Long project_id) {
//         Project project = projectService.getProjectById(project_id);
//         return ResponseEntity.ok(project);
//     }

//     // Update project title
//     @PutMapping("/{project_id}")
//     public ResponseEntity<Project> updateProjectTitle(@PathVariable Long project_id, @RequestBody Project project) {
//         Project updatedProject = projectService.editProjectTitle(project_id, project.getTitle());
//         return ResponseEntity.ok(updatedProject);
//     }
// }



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.Management.Entity.Project;
import com.todo.Management.Service.ProjectService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    // Create a new project
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        // Ensure that the project has a title and other necessary fields (e.g., createdDate)
        if (project.getTitle() == null || project.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().build(); // return 400 if title is missing
        }

        Project existingProject = projectService.findByTitle(project.getTitle());
        if (existingProject != null) {
            return ResponseEntity.status(409).build(); // return 409 Conflict if project title already exists
        }

        Project createdProject = projectService.createProject(project.getTitle());
        return ResponseEntity.ok(createdProject); // return created project in the response
    }

    // List all projects
    @GetMapping
    public ResponseEntity<List<Project>> listAllProjects() {
        List<Project> projects = projectService.listAllProjects();
        return ResponseEntity.ok(projects);
    }

    // View a specific project by ID
    @GetMapping("/{project_id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long project_id) {
        Project project = projectService.getProjectById(project_id);

        // If the project is not found, return 404 Not Found
        if (project == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(project);
    }

    // Update project title
    @PutMapping("/{project_id}")
    public ResponseEntity<Project> updateProjectTitle(@PathVariable Long project_id, @RequestBody Project project) {
        // Validate if project exists before updating
        Project updatedProject = projectService.editProjectTitle(project_id, project.getTitle());

        // If the project is not found, return 404 Not Found
        if (updatedProject == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedProject);
    }
}
