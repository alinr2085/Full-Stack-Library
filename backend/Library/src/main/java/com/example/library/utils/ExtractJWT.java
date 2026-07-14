package com.example.library.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nimbusds.jose.shaded.gson.JsonParser;

import java.util.Base64;

public class ExtractJWT {

        public static String payloadJWTExtract(String token) throws JsonProcessingException {
                token = token.replace("Bearer ", "");
                String payload = new String(Base64.getUrlDecoder().decode(token.split("\\.")[1]));
                JsonNode payloadNode = new ObjectMapper().readTree(payload);

                JsonNode emailNode = payloadNode.get("email");
                return emailNode != null ? emailNode.asText() : null;        }


}
