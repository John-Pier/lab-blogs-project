package com.johnpier.labproject.auth;

import com.johnpier.labproject.services.UserRepositoryService;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.*;
import java.util.function.Function;

import static java.util.stream.Collectors.toList;

@Component
public class JwtTokenUtil implements Serializable {
    private static final long serialVersionUID = -2550185165626007488L;
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60 * 1000;

    @Value("${jwt.secret}")
    private String secret = "my-best-secret";

    private UserRepositoryService userRepositoryService; // todo

    public JwtTokenUtil(UserRepositoryService userRepositoryService) {
        this.userRepositoryService = userRepositoryService;
    }

    public static String getBearerToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return null;
    }

    public static String toBearerToken(String token) {
        if (token == null) {
            return "";
        }
        return "Bearer " + token;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        var roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(toList());
        claims.put("roles", roles);
        claims.put("login", userDetails.getUsername());

        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY)).signWith(SignatureAlgorithm.HS512, secret).compact();
    }

//    public Object parseToken(String jwt) {
//        Jwts.parser()
//                .setSigningKey(secret)
//                .setSigningKeyResolver(signingKeyResolver)
//                .parseClaimsJws(jwt);
//        return  null;
//    }

//    private final SigningKeyResolver signingKeyResolver = new SigningKeyResolverAdapter() {
//        @Override
//        public byte[] resolveSigningKeyBytes(JwsHeader header, Claims claims) {
//            return TextCodec.BASE64.decode(secrets.get(header.getAlgorithm()));
//        }
//    }
}
