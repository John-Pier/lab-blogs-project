package com.johnpier.labproject.repositories;

import com.johnpier.labproject.entities.NamedUserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<NamedUserRole, String> {
}
