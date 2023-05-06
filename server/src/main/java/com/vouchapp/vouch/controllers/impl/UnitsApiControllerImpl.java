package com.vouchapp.vouch.controllers.impl;

import com.vouchapp.vouch.controllers.model.IUnitsApiController;
import com.vouchapp.vouch.model.HousingUnit;
import com.vouchapp.vouch.model.Landlord;
import com.vouchapp.vouch.model.LandlordVO;
import com.vouchapp.vouch.model.UnitWithLandlordVO;
import com.vouchapp.vouch.repositories.LandlordRepository;
import com.vouchapp.vouch.repositories.UnitsRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/units")
public class UnitsApiControllerImpl implements IUnitsApiController {

    @Autowired
    UnitsRepository unitsRepository;

    @Autowired
    LandlordRepository landlordRepository;

    @GetMapping
    public List<HousingUnit> getHousingUnits() {
        return unitsRepository.findAll();
    }

    @GetMapping("by-landlord")
    public List<HousingUnit> getUnitsByLandlord(@RequestParam String landlordId) {
        if (landlordId == null) return Collections.emptyList();
        Landlord landlord = landlordRepository.findById(landlordId).orElseThrow();
        return unitsRepository.findByLandlord(landlord);
    }

    @PatchMapping("add-landlord")
    public HousingUnit addLandlord(@RequestBody Map<String, String> patchBody) {
        if (!patchBody.containsKey("landlordId") || !patchBody.containsKey("unitId")) return null;
        HousingUnit unit = unitsRepository.findById(patchBody.get("unitId")).orElseThrow();
        Landlord landlord = landlordRepository.findById(patchBody.get("landlordId")).orElseThrow();
        unit.setLandlord(landlord);
        unitsRepository.saveAndFlush(unit);
        return unit;
    }

    @PostMapping("add-unit")
    public HousingUnit addUnit(@Valid @RequestBody HousingUnit housingUnit) {
        unitsRepository.saveAndFlush(housingUnit);
        return housingUnit;
    }

    @PostMapping("add-unit-landlord")
    public HousingUnit addUnitWithLandlord(@Valid @RequestBody UnitWithLandlordVO unitWithLandlord) {
        HousingUnit unit = unitWithLandlord.getHousingUnit();
        LandlordVO landlordVO = unitWithLandlord.getLandlord();
        landlordVO.setName(landlordVO.toName());
        Landlord landlord = null;
        if (landlordVO.getPhoneNumber() != null || landlordVO.getEmail() != null) {
            landlord = landlordRepository.findLandlordByEmailOrPhoneNumber(landlordVO.getEmail(), landlordVO.getPhoneNumber());
        }
        if (landlord == null) {
            landlord = landlordRepository.saveAndFlush(new Landlord(landlordVO));
        }
        unit.setLandlord(landlord);
        unitsRepository.saveAndFlush(unit);

        return unit;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, DataIntegrityViolationException.class, Exception.class})
    public void handleValidationExceptions(MethodArgumentNotValidException ex) {
        System.out.println("in handle validation Excpetions");
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            errors.put(fieldName, errorMessage);
//        });
//        return errors;
    }


}
