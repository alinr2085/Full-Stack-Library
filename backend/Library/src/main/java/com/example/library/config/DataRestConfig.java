package com.example.library.config;

import com.example.library.entity.Book;
import com.example.library.entity.Message;
import com.example.library.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

        private String[] allowedOrigins = {"https://localhost:5173", "https://localhost:8081"};

        @Override
        public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
                config.exposeIdsFor(Book.class);
                config.exposeIdsFor(Review.class);
                config.exposeIdsFor(Message.class);

                disableSomeMethods(Book.class, config);
                disableSomeMethods(Review.class, config);
                disableSomeMethods(Message.class, config);

                cors.addMapping("/**")
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(3600);
        }

        private void disableSomeMethods(Class<?> entity, RepositoryRestConfiguration config) {
                HttpMethod[] unsupportedActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT, HttpMethod.PATCH};

                config.getExposureConfiguration().forDomainType(entity).
                        withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))).
                        withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedActions)));
        }
}
