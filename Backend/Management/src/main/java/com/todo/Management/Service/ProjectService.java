package com.todo.Management.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.Management.Entity.Project;
import com.todo.Management.Repository.ProjectRepository;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;


           
        
            public Project createProject(String title) {
                Project project = new Project();
                project.setTitle(title);
                project.setCreatedDate(LocalDateTime.now());
                return projectRepository.save(project);
            }
        
            
            public Project editProjectTitle(Long project_id, String newTitle) {
                Optional<Project> optionalProject = projectRepository.findById(project_id);
                if (optionalProject.isPresent()) {
                    Project project = optionalProject.get();
                    project.setTitle(newTitle);
                    return projectRepository.save(project);
                } else {
                    throw new RuntimeException("Project not found with ID: " + project_id);
                }
            }
        
           
            public List<Project> listAllProjects() {
                return projectRepository.findAll();
            }
        
            public Project getProjectById(Long project_id) {
                return projectRepository.findById(project_id)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + project_id));
    }


    public Project findByTitle(String title) {
        return projectRepository.findByTitle(title);
    }
}




