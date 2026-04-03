package com.squad.api.repository;

import com.squad.api.model.JournalEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JournalEntryRepository extends JpaRepository<JournalEntry, UUID> {

    @Query("SELECT j FROM JournalEntry j ORDER BY j.date DESC, j.createdAt DESC")
    List<JournalEntry> findAllOrderByDateDesc();
}
