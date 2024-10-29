package com.project.mystat.Entity;

import lombok.Getter;

@Getter
public class CpsWithRank {
    private final String name;
    private final double cps;
    private final int rank;

    public CpsWithRank(Cps cps, int rank) {
        this.name = cps.getName();
        this.cps = cps.getCps();
        this.rank = rank;
    }
}
