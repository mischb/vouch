package com.vouchapp.vouch.model;

import lombok.Data;
import org.springframework.util.StringUtils;

import java.util.stream.Stream;

@Data
public class LandlordVO extends Landlord {
    private String fname;
    private String lname;

    public String toName() {
        return String.join(" ",  Stream.of(this.fname, this.lname).filter(StringUtils::hasLength).toList());
    }
}
