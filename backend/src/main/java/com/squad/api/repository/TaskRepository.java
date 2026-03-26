package com.squad.api.repository;

import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    @Query("SELECT t FROM Task t WHERE t.matrix = :matrix ORDER BY t.dueDate ASC NULLS LAST, t.createdAt ASC")
    List<Task> findAllByMatrixOrderByDueDate(Matrix matrix);

    @Query("SELECT t FROM Task t WHERE t.quadrant = :quadrant AND t.matrix = :matrix ORDER BY t.dueDate ASC NULLS LAST, t.createdAt ASC")
    List<Task> findByQuadrantAndMatrixOrderByDueDate(Quadrant quadrant, Matrix matrix);
}
