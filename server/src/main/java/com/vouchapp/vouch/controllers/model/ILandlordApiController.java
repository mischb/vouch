package com.vouchapp.vouch.controllers.model;

import com.vouchapp.vouch.model.Landlord;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface ILandlordApiController {

    @GetMapping
    public List<Landlord> getLandlords();

    @PostMapping
    public Landlord createLandlord(@RequestBody Landlord landlord);
}
