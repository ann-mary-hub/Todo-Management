package com.todo.Management.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.todo.Management.Entity.Project;
import com.todo.Management.Entity.Todo;
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
        // Ensure that the project has a title and other necessary fields (e.g.,
        // createdDate)
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

    @Value("${github.token}") // Store GitHub token securely
    private String githubToken;

    @PostMapping("/{projectId}/export-gist")
    public ResponseEntity<String> exportAsGist(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId); // Fetch project
        if (project == null) {
            return ResponseEntity.notFound().build();
        }

        // Generate Gist content in Markdown format
        StringBuilder markdown = new StringBuilder();
        markdown.append("# ").append(project.getTitle()).append("\n\n");
        markdown.append("Summary: ")
                .append(project.getTodos().stream().filter(todo -> todo.getStatus() == Todo.Status.COMPLETED).count())
                .append(" / ")
                .append(project.getTodos().size())
                .append(" completed.\n\n");

        project.getTodos()
                .forEach(todo -> System.out.println("Todo: " + todo.getDescription() + " Status: " + todo.getStatus()));

        // Filter Pending and Completed Todos
        List<String> pendingTodos = project.getTodos().stream()
                .filter(todo -> todo.getStatus() == Todo.Status.PENDING)
                .map(Todo::getDescription)
                .collect(Collectors.toList());

        List<String> completedTodos = project.getTodos().stream()
                .filter(todo -> todo.getStatus() == Todo.Status.COMPLETED)
                .map(Todo::getDescription)
                .collect(Collectors.toList());

        // Add Pending Todos to markdown
        if (!pendingTodos.isEmpty()) {
            markdown.append("## Pending Todos:\n");
            pendingTodos.forEach(todo -> markdown.append("- [ ] ").append(todo).append("\n"));
        } else {
            markdown.append("## Pending Todos: None\n");
        }

        markdown.append("\n");

        // Add Completed Todos to markdown
        if (!completedTodos.isEmpty()) {
            markdown.append("## Completed Todos:\n");
            completedTodos.forEach(todo -> markdown.append("- [x] ").append(todo).append("\n"));
        } else {
            markdown.append("## Completed Todos: None\n");
        }

        // Prepare the payload for GitHub API
        String payload = String.format("""
                {
                    "description": "Project Summary: %s",
                    "public": false,
                    "files": {
                        "%s.md": {
                            "content": "%s"
                        }
                    }
                }
                """, project.getTitle(), project.getTitle(), markdown.toString().replace("\n", "\\n"));

        // Send request to GitHub API
        String url = "https://api.github.com/gists";
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(githubToken); // Set Authorization header
        headers.setContentType(MediaType.APPLICATION_JSON); // Set Content-Type header to JSON

        // Ensure payload and headers are correctly set
        HttpEntity<String> request = new HttpEntity<>(payload, headers); // Create request entity

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return ResponseEntity.ok(response.getBody());
        }

        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }

}
