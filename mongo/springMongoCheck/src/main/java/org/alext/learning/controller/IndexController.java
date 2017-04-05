package org.alext.learning.controller;

import org.alext.learning.repository.AssetRepository;
import org.alext.learning.services.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequestMapping("/")
public class IndexController {


    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssetService assetService;

    @RequestMapping
    public String index(Model model) {

        model.addAttribute("assets", assetService.getAssets(20));


        return "index";
    }
}
