package com.todo.Management.Service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.Management.Entity.Todo;
import com.todo.Management.Entity.Todo.Status;
import com.todo.Management.Repository.TodoRepository;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Autowired
    private ProjectService projectService;

    // public Todo addTodoToProject(Todo.todo) {
    //     Project project = projectService.getProjectById(project_id);

    //     Todo todo = new Todo();
    //     todo.setDescription(description);
    //     todo.setStatus(Status.PENDING);
    //     todo.setCreatedDate(LocalDateTime.now());
    //     todo.setProject(project);

    //     return todoRepository.save(todo);
    // }

  
    public Todo addTodoToProject(Todo todo) {
        return todoRepository.save(todo);  // Save the Todo with the associated Project
    }

  
    // public Todo updateTodo(Long todoId, String newDescription) {
    //     Todo todo = todoRepository.findById(todoId)
    //             .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + todoId));

    //     todo.setDescription(newDescription);
    //     todo.setUpdatedDate(LocalDateTime.now());

    //     return todoRepository.save(todo);
    // }


    // public Todo updateTodo(Long todoId, Todo updatedTodo) {
    //     // Find the existing Todo by ID
    //     Todo existingTodo = todoRepository.findById(todoId)
    //         .orElseThrow(() -> new ResourceNotFoundException("Todo not found with ID: " + todoId));

    //     // Update the fields of the existing Todo
    //     if (updatedTodo.getDescription() != null) {
    //         existingTodo.setDescription(updatedTodo.getDescription());
    //     }

    //     if (updatedTodo.getStatus() != null) {
    //         existingTodo.setStatus(updatedTodo.getStatus());
    //     }

    //     // You can also update other fields as necessary (e.g., updatedDate)
    //     existingTodo.setUpdatedDate(LocalDateTime.now());

    //     // Save the updated Todo and return it
    //     return todoRepository.save(existingTodo);
    // }




    public Todo updateTodo(Long todoId, Todo updatedTodo) {
        // Find the existing Todo by ID
        Todo existingTodo = todoRepository.findById(todoId).orElse(null);
    
        // Check if the Todo exists
        if (existingTodo == null) {
            throw new RuntimeException("Todo not found with ID: " + todoId); // Throw a RuntimeException if not found
        }
    
        // Update the fields of the existing Todo
        if (updatedTodo.getDescription() != null) {
            existingTodo.setDescription(updatedTodo.getDescription());
        }
    
        if (updatedTodo.getStatus() != null) {
            existingTodo.setStatus(updatedTodo.getStatus());
        }
    
        // You can also update other fields as necessary (e.g., updatedDate)
        existingTodo.setUpdatedDate(LocalDateTime.now());
    
        // Save the updated Todo and return it
        return todoRepository.save(existingTodo);
    }
    
 
    public void removeTodo(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + todoId));
        todoRepository.delete(todo);
    }

    public Todo markTodoAsComplete(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + todoId));

        todo.setStatus(Status.COMPLETED);
        todo.setUpdatedDate(LocalDateTime.now());

        return todoRepository.save(todo);
    }

    public Todo markTodoAsPending(Long todoId) {
        Todo todo = todoRepository.findById(todoId)
                .orElseThrow(() -> new RuntimeException("Todo not found with ID: " + todoId));

        todo.setStatus(Status.PENDING);
        todo.setUpdatedDate(LocalDateTime.now());

        return todoRepository.save(todo);
    }





   
}

