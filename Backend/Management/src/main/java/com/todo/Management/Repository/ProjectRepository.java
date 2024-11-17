package com.todo.Management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.Management.Entity.Project;

@Repository

public interface ProjectRepository extends JpaRepository<Project, Long> {

    Project findByTitle(String title);
}
