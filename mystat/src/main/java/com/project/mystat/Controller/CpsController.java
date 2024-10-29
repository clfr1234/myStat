package com.project.mystat.Controller;

import com.project.mystat.Service.CpsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class CpsController {
    @Autowired
    private CpsService cpsService;

    @PostMapping("/cps/leaderboard/register")
    public String uploadCpsLeaderboard(@RequestParam("name") String name, @RequestParam("cps") double cps, RedirectAttributes rttr) {
        cpsService.addLeaderboard(name, cps);
        rttr.addFlashAttribute("goLead", "true");
        return "redirect:/cps";
    }

    @GetMapping("/cps/leaderboard")
    public String cpsLeaderboard(Model model) {
        model.addAttribute("leaderboards",cpsService.showAll());
        return "cps/leaderboard";
    }
}
