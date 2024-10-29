package com.project.mystat.Entity;

import lombok.Getter;

@Getter
public class ReactionWithRank {
    private final String name;
    private final double record;
    private final int rank;

    public ReactionWithRank(Reaction reaction, int rank) {
        this.name = reaction.getName();
        this.record = reaction.getRecord();
        this.rank = rank;
    }

}
