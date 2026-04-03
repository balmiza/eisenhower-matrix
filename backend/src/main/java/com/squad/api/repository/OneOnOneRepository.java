package com.squad.api.repository;

import com.squad.api.model.OneOnOne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OneOnOneRepository extends JpaRepository<OneOnOne, UUID> {

    @Query("SELECT o FROM OneOnOne o WHERE o.userId = :userId ORDER BY o.date DESC, o.createdAt DESC")
    List<OneOnOne> findAllByUserIdOrderByDateDesc(@Param("userId") String userId);
}
