package com.group09.travelPlanner.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:mysql://localhost:3306/tripPlannerDB?useSSL=false&serverTimezone=UTC")
                .username("root")
                .password("MySQL61.")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
