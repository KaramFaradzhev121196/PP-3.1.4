package com.example.web.controller;

import com.example.web.model.User;
import com.example.web.service.RoleService;
import com.example.web.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminRestController {
    private final UserService userService;
    private final RoleService roleService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsersList() {
        return ResponseEntity.ok().body(userService.getAllUser());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody @Valid User user,
                                       @RequestParam(required = false, name = "newRoles") String[] newRoles) {
        for (String role : newRoles) {
            user.setOneRole(roleService.getRoleByRole(role));
        }
        userService.addUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PatchMapping("/update")
    public ResponseEntity<User> update(@RequestBody @Valid User user,
                                       @RequestParam(required = false, name = "currentRoles") String[] currentRoles) {
        for (String role : currentRoles) {
            user.setOneRole(roleService.getRoleByRole(role));
        }
        userService.updateUser(user);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable(value = "id") Long id) {
        userService.deleteById(id);
    }
}