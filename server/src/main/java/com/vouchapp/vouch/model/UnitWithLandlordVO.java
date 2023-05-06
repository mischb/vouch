package com.vouchapp.vouch.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.validation.annotation.Validated;

@Validated
@Data
@NoArgsConstructor
public class UnitWithLandlordVO {
    HousingUnit housingUnit;
    LandlordVO landlord;
}
