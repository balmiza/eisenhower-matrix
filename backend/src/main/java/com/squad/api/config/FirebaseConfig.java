package com.squad.api.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() throws IOException {
        if (FirebaseApp.getApps().isEmpty()) {
            String serviceAccountJson = System.getenv("FIREBASE_SERVICE_ACCOUNT_JSON");
            GoogleCredentials credentials = GoogleCredentials.fromStream(
                new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8))
            );
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(credentials)
                .build();
            FirebaseApp.initializeApp(options);
        }
    }
}
