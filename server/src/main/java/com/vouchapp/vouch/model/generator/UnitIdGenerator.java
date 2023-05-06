package com.vouchapp.vouch.model.generator;

import com.vouchapp.vouch.model.HousingUnit;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.util.Random;

public class UnitIdGenerator extends CustomIdGenerator {
    @Override
    public Object generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {
        return ((HousingUnit) obj).getPostalCode() + "-" + getBase36(10);
    }
}


