package com.vouchapp.vouch;

import com.vouchapp.vouch.model.HousingUnit;
import com.vouchapp.vouch.model.Landlord;
import com.vouchapp.vouch.repositories.LandlordRepository;
import com.vouchapp.vouch.repositories.UnitsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
class LoadDatabase {

    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(UnitsRepository repository, LandlordRepository landlordRepository) {
        repository.deleteAll();
        landlordRepository.deleteAll();
        HousingUnit home = new HousingUnit("1C",40.643731,-73.96815,  "1112", "Beverley Road", "11218", "Brooklyn", "Kings", "USA");
        HousingUnit home1 = new HousingUnit("1D", 40.643732, -73.96814,"1112", "Beverley Road", "11218", "Brooklyn", "Kings", "USA");

        Landlord landlord = new Landlord();
        home.setLandlord(landlord);
        home1.setLandlord(landlord);
        landlord.setEmail("mischarberlin@gmail.com");
        return args -> {
            log.info("Preloading " + landlordRepository.saveAll(List.of(landlord)));
            log.info("Preloading " + repository.saveAll(List.of(home, home1)));
        };

    }
}