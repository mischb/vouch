package com.vouchapp.vouch.model.generator;

import org.hibernate.id.IdentifierGenerator;

import java.util.Random;

abstract public class CustomIdGenerator implements IdentifierGenerator {

    private static final char[] base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                    .toCharArray();

    private static final Random random = new Random();

    public String getBase36(int length) {
        var sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(base62chars[random.nextInt(36)]);

        return sb.toString();
    }
}
