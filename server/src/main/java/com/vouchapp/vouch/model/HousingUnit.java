package com.vouchapp.vouch.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.validation.annotation.Validated;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

//uuid (can be zipcode+random digits)	Create Time Stamp	Last rented	Cost?	Street Number	Unit number	Street Name	Zipcode	City	County	Country	Neighborhood	LandlordID
@Entity(name = "units")
@Data
@Validated
@NoArgsConstructor
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "lat", "lng" }) })
public class HousingUnit {

    private static final List<String> requireFields = List.of("lat", "lng", "streetNumber", "streetName", "postalCode", "city", "county", "country");

    @Id
    @GeneratedValue(generator = "unitId-generator")
    @GenericGenerator(name = "unitId-generator",
            strategy = "com.vouchapp.vouch.model.generator.UnitIdGenerator")
    private String unitId;

    @Column(nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp cr_ts;

    @NotNull
    @Column(nullable = false)
    private Number lat;
    @NotNull
    @Column(nullable = false)
    private Number lng;

    private Date lst_rented;
    private String unit;

    @NotNull
    @Column(nullable = false)
    private String streetNumber;

    @NotNull
    @Column(nullable = false)
    private String streetName;

    @NotNull
    @Column(nullable = false)
    private String postalCode;
    @NotNull
    @Column(nullable = false)
    private String city;
    @NotNull
    @Column(nullable = false)
    private String county;
    @NotNull
    @Column(nullable = false)
    private String country;

    @ManyToOne
    @JoinColumn(name = "landlordId")
    private Landlord landlord;

    public HousingUnit(String unit, @NotNull Number lat, @NotNull Number lng, @NotNull String streetNumber, @NotNull String streetName, @NotNull String postalCode, @NotNull String city, @NotNull String county, @NotNull String country) {
//        this.lst_rented = lastRented;
        this.unit = unit;
        this.lat = lat;
        this.lng = lng;
        this.streetNumber = streetNumber;
        this.streetName = streetName;
        this.postalCode = postalCode;
        this.city = city;
        this.county = county;
        this.country = country;
    }
}


