package com.Management;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProjectControllerTest  {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testCreateProject() throws Exception {
        String newProjectJson = """
            {
                "title": "Test Project"
            }
            """;

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newProjectJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Test Project"));
    }

    @Test
    public void testListAllProjects() throws Exception {
        mockMvc.perform(get("/api/projects")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testGetProjectById() throws Exception {
        Long projectId = 13L; 

        mockMvc.perform(get("/api/projects/" + projectId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(projectId));
    }

    @Test
    public void testUpdateProjectTitle() throws Exception {
        Long projectId = 13L; 
        String updatedProjectJson = """
            {
                "title": "Updated Project Title"
            }
            """;

        mockMvc.perform(put("/api/projects/" + projectId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedProjectJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Project Title"));
    }

   
}

