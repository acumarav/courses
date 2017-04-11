package com.boot.config;

import org.springframework.boot.autoconfigure.flyway.FlywayDataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;


/**
 * Created by alex on 11/6/2016.
 */
@Configuration
public class PersistenceConfiguration {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    @Primary
    public DataSource dataSource(){
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "datasource.flyway")
    @FlywayDataSource
    public DataSource flywayDataSource(){
        return DataSourceBuilder.create().build();
    }
}
