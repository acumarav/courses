@Grab("org.webjars:jquery:2.1.1")
@Grab("thymeleaf-spring4")
@Controller
class ModernApp {

    def chapters = ["Quick Start With Groovy",
        "Quick Start With Java",
        "Debugging and Managing Your App",
        "Data Access with Spring Boot",
        "Securing Your App"]

    @RequestMapping("/")
    def home(@RequestParam(value="name", defaultValue="World") String n) {
        new ModelAndView("modern")
            .addObject("name", n)
            .addObject("chapters", chapters)
    }
}