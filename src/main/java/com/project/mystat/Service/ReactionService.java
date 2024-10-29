package com.project.mystat.Service;

import com.project.mystat.Entity.Reaction;
import com.project.mystat.Entity.ReactionWithRank;
import com.project.mystat.Repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class ReactionService {
    @Autowired
    private ReactionRepository reactionRepository;

    public void addLeaderboard(String name, double recordTime) {
        Reaction r = Reaction.builder().name(name).record(recordTime).build();
        reactionRepository.save(r);
    }

    public List<ReactionWithRank> showAll() {
        // Sort by the 'record' field in ascending order
        Sort sort = Sort.by(Sort.Direction.ASC, "record");
        List<Reaction> reactions = reactionRepository.findAll(sort);

        // Add ranking to each reaction

        return IntStream.range(0, reactions.size())
                .mapToObj(i -> new ReactionWithRank(reactions.get(i), i + 1))
                .collect(Collectors.toList());
    }
}
