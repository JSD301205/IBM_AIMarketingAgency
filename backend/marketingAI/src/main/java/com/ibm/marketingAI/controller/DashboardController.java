package com.ibm.marketingAI.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.marketingAI.dto.CampaignRequest;
import com.ibm.marketingAI.dto.TwitterAnalyticsDTO;
import com.ibm.marketingAI.dto.TwitterPostDTO;
import com.ibm.marketingAI.repo.VersionRepo;
import com.ibm.marketingAI.security.JwtUtil;
import com.ibm.marketingAI.service.CampaignService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/dashboard")
@Slf4j
public class DashboardController {

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private VersionRepo versionRepo;

    
    @PostMapping("/post")
    public ResponseEntity<?> generateCampaign(HttpServletRequest headerRequest,@RequestBody CampaignRequest request) {
        String authHeader = headerRequest.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
    }
    
    String token = authHeader.substring(7);
    String email = jwtUtil.extractUserId(token); // ✅ Extract user email from token
    if(email==null){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
    log.info("is valid? "+email);
    return ResponseEntity.ok(campaignService.generateCampaign(request,email));
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCampaign(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        log.info("TOKEN "+authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid token");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUserId(token); 
        log.info("email "+email);
        return ResponseEntity.ok(campaignService.getAllCampaignForUser(email));
    }

    @PostMapping("twitter/save")
    public ResponseEntity<String> savePost(@RequestBody TwitterPostDTO dto) {
        campaignService.saveTwitterPost(dto);
        return ResponseEntity.ok("Twitter post saved successfully");
    }

    @GetMapping("/getid/{vid}")
    public ResponseEntity<String> getTwitterId(@PathVariable Long vid) {
        String twitterId = versionRepo.getTwitterId(vid);
        if (twitterId != null) {
            return ResponseEntity.ok(twitterId);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body("No Twitter ID found for version ID: " + vid);
        }
    }

    

     @GetMapping("/analytics/{tweetId}")
    public TwitterAnalyticsDTO getAnalytics(@PathVariable String tweetId) {
        return campaignService.fetchTweetAnalytics(tweetId);
    }

    

    


    
    
    
}
