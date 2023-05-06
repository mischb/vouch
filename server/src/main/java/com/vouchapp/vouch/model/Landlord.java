package com.vouchapp.vouch.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.sql.Timestamp;

@Entity(name="landlords")
@Data
@NoArgsConstructor
public class Landlord {
    @Id
    @GeneratedValue(generator = "landlordId-generator")
    @GenericGenerator(name = "landlordId-generator",
            strategy = "com.vouchapp.vouch.model.generator.LandlordIdGenerator")
    @Column(nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp cr_ts;

    private String name;
    private EntityType entityType = EntityType.INDIVIDUAL;
    @Column(unique = true)
    private String email;
    @Column(unique = true)
    private String phoneNumber;
    @Column(unique = true)
    private String address;

    public Landlord(LandlordVO landlordVO){
        this.name = landlordVO.toName();
        this.entityType = landlordVO.getEntityType();
        this.email = landlordVO.getEmail();
        this.phoneNumber = landlordVO.getPhoneNumber();
        this.address = landlordVO.getAddress();
    }
}
