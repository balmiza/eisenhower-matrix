package com.squad.api.service;

import com.squad.api.dto.JournalEntryRequest;
import com.squad.api.model.JournalEntry;
import com.squad.api.repository.JournalEntryRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JournalEntryService {

    private final JournalEntryRepository journalEntryRepository;

    @Transactional
    public JournalEntry createEntry(JournalEntryRequest request) {
        JournalEntry entry = JournalEntry.builder()
                .date(request.getDate())
                .type(request.getType())
                .content(request.getContent())
                .build();
        return journalEntryRepository.save(entry);
    }

    @Transactional(readOnly = true)
    public List<JournalEntry> getAllEntries() {
        return journalEntryRepository.findAllOrderByDateDesc();
    }

    @Transactional
    public JournalEntry updateEntry(UUID id, JournalEntryRequest request) {
        JournalEntry entry = journalEntryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Journal entry not found with id: " + id));
        entry.setDate(request.getDate());
        entry.setType(request.getType());
        entry.setContent(request.getContent());
        return journalEntryRepository.save(entry);
    }

    @Transactional
    public void deleteEntry(UUID id) {
        if (!journalEntryRepository.existsById(id)) {
            throw new EntityNotFoundException("Journal entry not found with id: " + id);
        }
        journalEntryRepository.deleteById(id);
    }
}
