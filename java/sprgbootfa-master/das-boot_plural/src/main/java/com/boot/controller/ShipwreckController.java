package com.boot.controller;

import ch.qos.logback.core.joran.util.beans.BeanUtil;
import com.boot.model.Shipwreck;
import com.boot.repository.ShipwreckRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by alex on 11/6/2016.
 */
@RestController
@RequestMapping(value = "api/v1/")
//@CrossOrigin
public class ShipwreckController {

    @Autowired
    private ShipwreckRepository shipwreckRepository;

    @RequestMapping(value = "shipwrecks", method = RequestMethod.GET)
    public List<Shipwreck> list() {
        //return ShipwreckStub.list();
        return shipwreckRepository.findAll();
    }

    @RequestMapping(value = "shipwrecks/{id}", method = RequestMethod.GET)
    public Shipwreck get(@PathVariable Long id){
        //return ShipwreckStub.get(id);
        return shipwreckRepository.findOne(id);
    }

    @RequestMapping(value = "shipwrecks/{id}", method = RequestMethod.PUT)
    public Shipwreck update(@PathVariable Long id, @RequestBody Shipwreck shipwreck) {
        //return ShipwreckStub.update(id, shipwreck);
        Shipwreck existing = shipwreckRepository.findOne(id);
        BeanUtils.copyProperties(shipwreck,existing);
        return shipwreckRepository.saveAndFlush(existing);
    }

    @RequestMapping(value = "shipwrecks/{id}", method = RequestMethod.DELETE)
    public Shipwreck delete(@PathVariable Long id){
        //return ShipwreckStub.delete(id);
        Shipwreck existing = shipwreckRepository.findOne(id);
        shipwreckRepository.delete(existing);
        return existing;
    }

    @RequestMapping(value = "shipwrecks", method = RequestMethod.POST)
    public Shipwreck create(@RequestBody Shipwreck shipwreck) {
        //return ShipwreckStub.create(shipwreck);
        return shipwreckRepository.saveAndFlush(shipwreck);
    }
}
