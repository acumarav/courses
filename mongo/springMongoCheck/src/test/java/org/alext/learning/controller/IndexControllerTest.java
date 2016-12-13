package org.alext.learning.controller;


import org.alext.learning.repository.AssetRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;



@RunWith(SpringRunner.class)
@SpringBootTest
public class IndexControllerTest {

    @Autowired
    private AssetRepository assetRepository;

    @org.junit.Before
    public void setUp() throws Exception {

    }

    @Test
    public void testRepositoryInjected() {
        Assert.assertNotNull(assetRepository);
    }
}