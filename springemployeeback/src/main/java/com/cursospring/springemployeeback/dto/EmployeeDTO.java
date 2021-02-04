package com.cursospring.springemployeeback.dto;

import com.cursospring.springemployeeback.model.Employee;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
public class EmployeeDTO {
    private Long id;

    @NotNull(message = "O nome � obrigat�rio")
    private String firstName;

    @NotNull(message = "O sobrenome � obrigat�rio")
    private String lastName;

    @NotNull(message = "O email � obrigat�rio")
    @Email(message = "Formato inv�lido")
    private String emailId;

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.emailId = employee.getEmailId();
    }
}
