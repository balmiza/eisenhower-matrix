package com.squad.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "one_on_ones")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OneOnOne {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(nullable = false, length = 255)
    private String manager;

    @Column(columnDefinition = "TEXT")
    private String agenda;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "next_steps", columnDefinition = "TEXT")
    private String nextSteps;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "user_id", nullable = false)
    private String userId;
}
