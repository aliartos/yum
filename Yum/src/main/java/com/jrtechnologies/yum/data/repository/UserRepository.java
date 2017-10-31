/*
 * Copyright (C) 2017 JR Technologies.
 * This file is part of Yum.
 * 
 * Yum is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * 
 * Yum is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along with Yum. 
 * If not, see <http://www.gnu.org/licenses/>.
 */
package com.jrtechnologies.yum.data.repository;

import java.util.List;
import com.jrtechnologies.yum.data.entity.User;
import com.jrtechnologies.yum.data.enums.UserRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author user
 */
@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long>{
    User findById(long id);
    User findByEmail(String email);
    User findBySecret(String secret);
    User findByLdapId(byte[] ldapId);
    List<User> findByUserRole(UserRole userRole);
    Page<User> findByLastNameStartingWith (Pageable pageable, String lastName);
    
    @Query(value="SELECT role FROM user WHERE id=:id  ", nativeQuery = true)
    String findRole(@Param("id") Long id);

    //Page<User> findPageable(Pageable pageable);
    //Page<Food> findByFoodTypeAndArchived(Pageable pageable, FoodType foodType, boolean archived);
}
