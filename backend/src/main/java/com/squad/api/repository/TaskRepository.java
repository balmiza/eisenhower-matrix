package com.squad.api.repository;

import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    @Query("SELECT t FROM Task t WHERE t.matrix = :matrix AND t.userId = :userId ORDER BY t.dueDate ASC NULLS LAST, t.createdAt ASC")
    List<Task> findAllByMatrixAndUserIdOrderByDueDate(@Param("matrix") Matrix matrix, @Param("userId") String userId);

    @Query("SELECT t FROM Task t WHERE t.quadrant = :quadrant AND t.matrix = :matrix AND t.userId = :userId ORDER BY t.dueDate ASC NULLS LAST, t.createdAt ASC")
    List<Task> findByQuadrantAndMatrixAndUserIdOrderByDueDate(@Param("quadrant") Quadrant quadrant, @Param("matrix") Matrix matrix, @Param("userId") String userId);

    @Query("SELECT t FROM Task t WHERE t.matrix = :matrix AND t.userId = :userId")
    List<Task> findByMatrixAndUserId(@Param("matrix") Matrix matrix, @Param("userId") String userId);
}
