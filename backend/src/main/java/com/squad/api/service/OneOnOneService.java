package com.squad.api.service;

import com.squad.api.dto.OneOnOneRequest;
import com.squad.api.model.OneOnOne;
import com.squad.api.repository.OneOnOneRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OneOnOneService {

    private final OneOnOneRepository oneOnOneRepository;

    @Transactional
    public OneOnOne createOneOnOne(OneOnOneRequest request, String userId) {
        OneOnOne oneOnOne = OneOnOne.builder()
                .date(request.getDate())
                .manager(request.getManager())
                .agenda(request.getAgenda())
                .notes(request.getNotes())
                .nextSteps(request.getNextSteps())
                .userId(userId)
                .build();
        return oneOnOneRepository.save(oneOnOne);
    }

    @Transactional(readOnly = true)
    public List<OneOnOne> getAllOneOnOnes(String userId) {
        return oneOnOneRepository.findAllByUserIdOrderByDateDesc(userId);
    }

    @Transactional
    public OneOnOne updateOneOnOne(UUID id, OneOnOneRequest request, String userId) {
        OneOnOne oneOnOne = oneOnOneRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OneOnOne not found with id: " + id));
        if (!oneOnOne.getUserId().equals(userId)) {
            throw new EntityNotFoundException("OneOnOne not found with id: " + id);
        }
        oneOnOne.setDate(request.getDate());
        oneOnOne.setManager(request.getManager());
        oneOnOne.setAgenda(request.getAgenda());
        oneOnOne.setNotes(request.getNotes());
        oneOnOne.setNextSteps(request.getNextSteps());
        return oneOnOneRepository.save(oneOnOne);
    }

    @Transactional
    public void deleteOneOnOne(UUID id, String userId) {
        OneOnOne oneOnOne = oneOnOneRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("OneOnOne not found with id: " + id));
        if (!oneOnOne.getUserId().equals(userId)) {
            throw new EntityNotFoundException("OneOnOne not found with id: " + id);
        }
        oneOnOneRepository.deleteById(id);
    }
}
