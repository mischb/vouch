package com.vouchapp.vouch.controllers.model;

import com.vouchapp.vouch.model.HousingUnit;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

public interface IUnitsApiController {
    @GetMapping
    public List<HousingUnit> getHousingUnits();
    @GetMapping("/by-landlord")
    public List<HousingUnit> getUnitsByLandlord(@RequestParam String landlordId);
    @PatchMapping("add-landlord")
    public HousingUnit addLandlord(@RequestBody Map<String, String> patchBody);
    @PostMapping("add-unit")
    public HousingUnit addUnit(@RequestBody HousingUnit postbody) throws Exception;
}
