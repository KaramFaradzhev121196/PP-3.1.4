package com.example.web.config;

import com.example.web.model.Role;
import com.example.web.model.User;
import com.example.web.service.RoleService;
import com.example.web.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import javax.annotation.PostConstruct;
import java.util.HashSet;
import java.util.Set;

@Component
@AllArgsConstructor
public class DataBaseInit {
    private final UserService userService;
    private final RoleService roleService;

    @PostConstruct
    private void startDB() {
        User user = new User("user", "Maxim", "Lavrov","user");
        User admin = new User("admin", "Viktor", "Barinov", "admin");
        User moderator = new User("moderator", "Dmitry", "Nagiev", "moderator");
        Role userRole = new Role("ROLE_USER");
        Role adminRole = new Role("ROLE_ADMIN");
        Set<Role> moderatorRole = new HashSet<>();
        moderatorRole.add(adminRole);
        moderatorRole.add(userRole);
        roleService.addRole(userRole);
        roleService.addRole(adminRole);
        user.setOneRole(userRole);
        admin.setOneRole(adminRole);
        moderator.setRoles(moderatorRole);
        userService.addUser(user);
        userService.addUser(admin);
        userService.addUser(moderator);
    }
}