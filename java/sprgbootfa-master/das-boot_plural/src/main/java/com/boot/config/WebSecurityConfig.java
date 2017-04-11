package com.boot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by alex on 11/9/2016.
 */
@Configuration
public class WebSecurityConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                //super.addCorsMappings(registry);
                registry.addMapping("/api/**").allowedOrigins("*");
            }
        };
    }
}
