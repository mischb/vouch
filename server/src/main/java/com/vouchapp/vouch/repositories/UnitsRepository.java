package com.vouchapp.vouch.repositories;

import com.vouchapp.vouch.model.HousingUnit;
import com.vouchapp.vouch.model.Landlord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UnitsRepository extends JpaRepository<HousingUnit, String> {
    List<HousingUnit> findByLandlord(Landlord landlord);
}
