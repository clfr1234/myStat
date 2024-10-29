package com.project.mystat.Service;

import com.project.mystat.Entity.Typing;
import com.project.mystat.Entity.TypingWithRank;
import com.project.mystat.Repository.TypingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class TypingService {
    @Autowired
    private TypingRepository typingRepository;

    public void addLeaderboard(String name, String timeText, BigDecimal record, int maxCombo) {
        Typing t = Typing.builder().name(name).time_text(timeText).record(record).max_combo(maxCombo).build();
        typingRepository.save(t);
    }

    public List<TypingWithRank> showAll() {

        List<Typing> typings = typingRepository.findAll();
        typings.sort(Comparator.comparing(Typing::getRecord));
        return IntStream.range(0, typings.size())
                .mapToObj(i -> new TypingWithRank(typings.get(i), i + 1))
                .collect(Collectors.toList());
    }
}
