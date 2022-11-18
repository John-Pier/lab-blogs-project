package com.johnpier.labproject.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RedirectViewController {
    @RequestMapping({"/auth", "/register", "/content/**"})
    public String index() {
        return "forward:/index.html";
    }
}
