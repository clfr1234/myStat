package com.project.mystat.Controller;

import com.project.mystat.Service.TypingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.math.BigDecimal;

@Controller

public class TypingController {
    @Autowired
    private TypingService typingService;
    @PostMapping("/typing/leaderboard/register")
    public String uploadTypingLeaderboard(@RequestParam("name") String name, @RequestParam("time_text") String timeText, @RequestParam("record") String record, @RequestParam("max_combo") int maxCombo, RedirectAttributes rttr) {
        BigDecimal formatTime = new BigDecimal(record);
        typingService.addLeaderboard(name, timeText, formatTime, maxCombo);
        rttr.addFlashAttribute("goLead", "true");
        return "redirect:/typing";
    }

    @GetMapping("/typing/leaderboard")
    public String typingLeaderboard(Model model) {
        model.addAttribute("leaderboards",typingService.showAll());
        return "typing/leaderboard";
    }
}
