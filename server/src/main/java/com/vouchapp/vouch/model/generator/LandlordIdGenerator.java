package com.vouchapp.vouch.model.generator;

import com.vouchapp.vouch.model.HousingUnit;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;

public class LandlordIdGenerator extends CustomIdGenerator{
    @Override
    public Object generate(SharedSessionContractImplementor session, Object obj) throws HibernateException {
        return getBase36(15);
    }
}
