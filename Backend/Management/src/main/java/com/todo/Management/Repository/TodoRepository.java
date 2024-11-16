package com.todo.Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.Management.Entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}

