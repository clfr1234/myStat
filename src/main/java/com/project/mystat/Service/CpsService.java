package com.project.mystat.Service;

import com.project.mystat.Entity.Cps;
import com.project.mystat.Entity.CpsWithRank;
import com.project.mystat.Repository.CpsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class CpsService {
    @Autowired
    private CpsRepository cpsRepository;

    public void addLeaderboard(String name, double cps) {
        Cps c = Cps.builder().name(name).cps(cps).build();
        cpsRepository.save(c);
    }

    public List<CpsWithRank> showAll() {
        Sort sort = Sort.by(Sort.Direction.DESC, "cps");
        List<Cps> cpss = cpsRepository.findAll(sort);

        return IntStream.range(0, cpss.size())
                .mapToObj(i -> new CpsWithRank(cpss.get(i), i + 1))
                .collect(Collectors.toList());
    }
}
