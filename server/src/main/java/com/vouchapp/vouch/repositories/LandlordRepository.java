package com.vouchapp.vouch.repositories;

import com.vouchapp.vouch.model.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LandlordRepository extends JpaRepository<Landlord, String> {
    @Query(value = "SELECT * FROM landlords l WHERE l.email = :email OR l.phone_number = :phone_number", nativeQuery = true)
    Landlord findLandlordByEmailOrPhoneNumber(@Param("email") String email, @Param("phone_number") String phoneNumber);
}
