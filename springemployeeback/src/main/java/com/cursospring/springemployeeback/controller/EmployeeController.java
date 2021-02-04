package com.cursospring.springemployeeback.controller;

import com.cursospring.springemployeeback.dto.EmployeeDTO;
import com.cursospring.springemployeeback.exception.ResourceNotFoundException;
import com.cursospring.springemployeeback.model.Employee;
import com.cursospring.springemployeeback.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repository;

    @GetMapping(value = "/employees")
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @PostMapping(value = "/employees")
    public Employee createEmployee(@Valid @RequestBody EmployeeDTO dto) {
        Employee employee = new Employee();
        BeanUtils.copyProperties(dto, employee);
        return repository.save(employee);
    }

    @GetMapping(value = "/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = this.findById(id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping(value = "/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDTO dto) {
        Employee employee = this.findById(id);
        BeanUtils.copyProperties(dto, employee, "id");
        Employee updated = repository.save(employee);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping(value = "/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
        Employee employee = this.findById(id);
        repository.deleteById(employee.getId());
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    private Employee findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }

}