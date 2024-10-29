package com.project.mystat.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String selectEventPage() {
        return "selectEvent";
    }

    @GetMapping("/reaction")
    public String reactionTestPage() {
        return "reaction/reactionTest";
    }

    @GetMapping("/typing")
    public String typingPage() {
        return "typing/typing";
    }

    @GetMapping("/cps")
    public String cpsPage() {
        return "cps/cps";
    }

    @GetMapping("/sight")
    public String sightPage() {
        return "sight/sight";
    }
}
