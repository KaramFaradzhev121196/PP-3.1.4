package com.example.web.service;

import com.example.web.model.Role;
import com.example.web.repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Set;

@Service
@Transactional
@AllArgsConstructor
public class RoleServiceImpl implements RoleService {
    private RoleRepository roleRepository;

    @Override
    public Set<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Override
    public Role getRoleByID(Long id) {
        return roleRepository.findRoleById(id);
    }

    @Override
    public Role getRoleByRole(String role) {
        return roleRepository.findRoleByRole(role);
    }

    @Override
    public void addRole(Role role) {
        roleRepository.save(role);
    }
}
