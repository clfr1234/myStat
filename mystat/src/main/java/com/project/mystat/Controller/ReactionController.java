package com.project.mystat.Controller;

import com.project.mystat.Service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ReactionController {
    @Autowired
    private ReactionService reactionService;

    @PostMapping("/reaction/leaderboard/register")
    public String uploadReactionLeaderboard(@RequestParam("name") String name, @RequestParam("record_time") double recordTime, RedirectAttributes rttr) {
        reactionService.addLeaderboard(name, recordTime);
        rttr.addFlashAttribute("goLead", "true");
        return "redirect:/reaction";
    }

    @GetMapping("/reaction/leaderboard")
    public String reactionLeaderboard(Model model) {
        model.addAttribute("leaderboards",reactionService.showAll());
        return "reaction/leaderboard";
    }
}
