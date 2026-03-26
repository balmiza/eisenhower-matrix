package com.squad.api.repository;

import com.squad.api.model.Matrix;
import com.squad.api.model.Quadrant;
import com.squad.api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

    List<Task> findByMatrix(Matrix matrix);

    List<Task> findByQuadrantAndMatrix(Quadrant quadrant, Matrix matrix);
}
