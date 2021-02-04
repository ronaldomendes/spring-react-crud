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

    @NotNull(message = "O nome é obrigatório")
    private String firstName;

    @NotNull(message = "O sobrenome é obrigatório")
    private String lastName;

    @NotNull(message = "O email é obrigatório")
    @Email(message = "Formato inválido")
    private String emailId;

    public EmployeeDTO(Employee employee) {
        this.id = employee.getId();
        this.firstName = employee.getFirstName();
        this.lastName = employee.getLastName();
        this.emailId = employee.getEmailId();
    }
}
