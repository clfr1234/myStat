package com.project.mystat.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@Builder
@Table(name = "typing")
@NoArgsConstructor
@AllArgsConstructor
public class Typing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    private String name;

    private BigDecimal record;

    private int max_combo;

    private String time_text;
}
