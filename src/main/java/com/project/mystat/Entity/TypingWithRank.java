package com.project.mystat.Entity;

import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class TypingWithRank {
    private final String name;
    private final BigDecimal record;
    private final int max_combo;
    private final int rank;
    private final String time_text;

    public TypingWithRank(Typing typing, int rank) {
        this.name = typing.getName();
        this.record = typing.getRecord();
        this.max_combo = typing.getMax_combo();
        this.rank = rank;
        this.time_text = typing.getTime_text();
    }
}
