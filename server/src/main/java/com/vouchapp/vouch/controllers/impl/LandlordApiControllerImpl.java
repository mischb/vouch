package com.vouchapp.vouch.controllers.impl;

import com.vouchapp.vouch.controllers.model.ILandlordApiController;
import com.vouchapp.vouch.model.Landlord;
import com.vouchapp.vouch.repositories.LandlordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/landlords")
public class LandlordApiControllerImpl implements ILandlordApiController {
    @Autowired
    LandlordRepository landlordRepository;

    @GetMapping
    public List<Landlord> getLandlords() {
        return landlordRepository.findAll();
    }

    @PostMapping
    public Landlord createLandlord(@RequestBody Landlord landlord) {
        return landlordRepository.save(landlord);
    }
}
