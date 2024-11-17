
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

}
