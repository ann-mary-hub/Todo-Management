// package com.todo.Management.Controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.todo.Management.Entity.Todo;
// import com.todo.Management.Service.TodoService;

// @RestController
// @RequestMapping("/api/todos")
// public class TodoController {

//     @Autowired
//     private TodoService todoService;

   
//     @PostMapping("/{project_id}")
//     public ResponseEntity<Todo> addTodoToProject(@PathVariable Long project_id, @RequestBody TodoRequest request) {
//         Todo todo = todoService.addTodoToProject(project_id, request.getDescription());
//         return ResponseEntity.ok(todo);
//     }

//     @PutMapping("/{todoId}")
//     public ResponseEntity<Todo> updateTodo(@PathVariable Long todoId, @RequestBody TodoRequest request) {
//         Todo updatedTodo = todoService.updateTodo(todoId, request.getDescription());
//         return ResponseEntity.ok(updatedTodo);
//     }

    
//     @DeleteMapping("/{todoId}")
//     public ResponseEntity<Void> removeTodo(@PathVariable Long todoId) {
//         todoService.removeTodo(todoId);
//         return ResponseEntity.noContent().build();
//     }


//     @PutMapping("/{todoId}/complete")
//     public ResponseEntity<Todo> markTodoAsComplete(@PathVariable Long todoId) {
//         Todo updatedTodo = todoService.markTodoAsComplete(todoId);
//         return ResponseEntity.ok(updatedTodo);
//     }

//     @PutMapping("/{todoId}/pending")
//     public ResponseEntity<Todo> markTodoAsPending(@PathVariable Long todoId) {
//         Todo updatedTodo = todoService.markTodoAsPending(todoId);
//         return ResponseEntity.ok(updatedTodo);
//     }

  
//     public static class TodoRequest {
//         private String description;

//         public String getDescription() {
//             return description;
//         }

//         public void setDescription(String description) {
//             this.description = description;
//         }
//     }
// }



package com.todo.Management.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.Management.Entity.Project;
import com.todo.Management.Entity.Todo;
import com.todo.Management.Service.ProjectService;
import com.todo.Management.Service.TodoService;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService todoService;

     @Autowired
    private ProjectService projectService;

    // Add a Todo to a Project
    // @PostMapping("/{project_id}")
    // public ResponseEntity<Todo> addTodoToProject(@PathVariable Long project_id, @RequestBody Todo todo) {
    //     // Ensure the Todo has a description and project_id before saving
    //     todo.setProjectId(project_id);  // Assuming Todo entity has a setProjectId method
    //     Todo createdTodo = todoService.addTodoToProject(todo);
    //     return ResponseEntity.ok(createdTodo);
    // }

    // // Update a Todo
    // @PutMapping("/{todoId}")
    // public ResponseEntity<Todo> updateTodo(@PathVariable Long todoId, @RequestBody Todo todo) {
    //     todo.setId(todoId);  // Ensure the Todo has the correct ID for updating
    //     Todo updatedTodo = todoService.updateTodo(todo);
    //     return ResponseEntity.ok(updatedTodo);
    // }


    @PostMapping("/{project_id}")
    public ResponseEntity<Todo> addTodoToProject(@PathVariable Long project_id, @RequestBody Todo todo) {
        // Use the injected ProjectService instance to call the method
        Project project = projectService.getProjectById(project_id);
    
        // Set the Project to the Todo entity
        todo.setProject(project);
    
        // Optionally, set the creation date if necessary
        todo.setCreatedDate(LocalDateTime.now());
    
        // Save the Todo and return the response
        Todo createdTodo = todoService.addTodoToProject(todo);
        return ResponseEntity.ok(createdTodo);
    }
    




    // Update a Todo
    // @PutMapping("/{todoId}")
    // public ResponseEntity<Todo> updateTodo(@PathVariable Long todoId, @RequestBody Todo todo) {
    //     todo.setId(todoId);  // Ensure the Todo has the correct ID for updating
    //     Todo updatedTodo = todoService.updateTodo(todo);
    //     return ResponseEntity.ok(updatedTodo);
    // }

    @PutMapping("/{todoId}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long todoId, @RequestBody Todo todo) {
        // Call the updateTodo method in TodoService to update the Todo by its ID
        Todo updatedTodo = todoService.updateTodo(todoId, todo);
        return ResponseEntity.ok(updatedTodo);
    }

    // Remove a Todo
    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> removeTodo(@PathVariable Long todoId) {
        todoService.removeTodo(todoId);
        return ResponseEntity.noContent().build();
    }

    // Mark a Todo as Complete
    @PutMapping("/{todoId}/complete")
    public ResponseEntity<Todo> markTodoAsComplete(@PathVariable Long todoId) {
        Todo updatedTodo = todoService.markTodoAsComplete(todoId);
        return ResponseEntity.ok(updatedTodo);
    }

    // Mark a Todo as Pending
    @PutMapping("/{todoId}/pending")
    public ResponseEntity<Todo> markTodoAsPending(@PathVariable Long todoId) {
        Todo updatedTodo = todoService.markTodoAsPending(todoId);
        return ResponseEntity.ok(updatedTodo);
    }




//  @Value("${github.token}") // Store GitHub token securely
//     private String githubToken;
//     @PostMapping("/{projectId}/export-gist")
// public ResponseEntity<Map<String, Object>> exportAsGist(@PathVariable Long projectId) {
//     Project project = projectService.getProjectById(projectId); // Fetch project
//     if (project == null) {
//         return ResponseEntity.notFound().build();
//     }

//     // Generate Gist content in Markdown format
//     StringBuilder markdown = new StringBuilder();
//     markdown.append("# ").append(project.getTitle()).append("\n\n");
//     markdown.append("Summary: ")
//             .append(project.getTodos().stream().filter(todo -> todo.getStatus() == Todo.Status.COMPLETED).count())
//             .append(" / ")
//             .append(project.getTodos().size())
//             .append(" completed.\n\n");

//     // Create lists for Pending and Completed Todos
//     List<String> pendingTodos = project.getTodos().stream()
//             .filter(todo -> todo.getStatus() == Todo.Status.PENDING)
//             .map(Todo::getDescription)
//             .collect(Collectors.toList());
//             System.out.println("Hii" + pendingTodos);

//     List<String> completedTodos = project.getTodos().stream()
//             .filter(todo -> todo.getStatus() == Todo.Status.COMPLETED)
//             .map(Todo::getDescription)
//             .collect(Collectors.toList());
//             System.out.println("Hii" + completedTodos);


//     // Log to ensure that the todos are filtered correctly
//     System.out.println("All Todos: " + project.getTodos());

//     System.out.println("Pending Todos: " + pendingTodos);
//     System.out.println("Completed Todos: " + completedTodos);

//     // Add Pending Todos to markdown
//     if (!pendingTodos.isEmpty()) {
//         markdown.append("## Pending Todos:\n");
//         pendingTodos.forEach(todo -> markdown.append("- [ ] ").append(pendingTodos).append("\n"));
//     } else {
//         markdown.append("## Pending Todos: None\n");
//     }

//     markdown.append("\n");

//     // Add Completed Todos to markdown
//     if (!completedTodos.isEmpty()) {
//         markdown.append("## Completed Todos:\n");
//         completedTodos.forEach(todo -> markdown.append("- [x] ").append(completedTodos).append("\n"));
//     } else {
//         markdown.append("## Completed Todos: None\n");
//     }

//     // Prepare the payload for GitHub API
//     String payload = String.format("""
//         {
//             "description": "Project Summary: %s",
//             "public": false,
//             "files": {
//                 "%s.md": {
//                     "content": "%s"
//                 }
//             }
//         }
//         """, project.getTitle(), project.getTitle(), markdown.toString().replace("\n", "\\n"));

//     // Send request to GitHub API
//     String url = "https://api.github.com/gists";
//     HttpHeaders headers = new HttpHeaders();
//     headers.setBearerAuth(githubToken);
//     headers.set("Content-Type", "application/json");
//     HttpEntity<String> request = new HttpEntity<>(payload, headers);

//     RestTemplate restTemplate = new RestTemplate();
//     ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

//     // Prepare the response body as a map
//     Map<String, Object> responseBody = new HashMap<>();
//     if (response.getStatusCode().is2xxSuccessful()) {
//         // Add the GitHub response and todos to the response map
//         responseBody.put("gist", response.getBody());
//         responseBody.put("pendingTodos", pendingTodos);
//         responseBody.put("completedTodos", completedTodos);

//         return ResponseEntity.ok(responseBody);
//     }

//     // In case of an error, return the error status and the response from GitHub
//     responseBody.put("error", "Failed to create gist");
//     responseBody.put("gistResponse", response.getBody());

//     return ResponseEntity.status(response.getStatusCode()).body(responseBody);
// }
}
