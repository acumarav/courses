package org.alext.learning.model;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;


@Configuration
public class DbConfig {

    @Bean
    @Qualifier("pgDataSource")
    @ConfigurationProperties(prefix = "pg.datasource")
    @ConditionalOnMissingBean(value = DataSource.class, name = "pgDataSource")
    @ConditionalOnProperty(prefix = "pg.dataSource", name = "url")
    public DataSource pgDataSource() {
        return DataSourceBuilder.create().build();
    }
}

