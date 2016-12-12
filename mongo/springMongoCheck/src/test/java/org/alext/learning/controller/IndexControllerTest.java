package org.alext.learning.controller;

import junit.framework.Assert;
import org.alext.learning.repository.AssetRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;


@RunWith(SpringRunner.class)
@SpringBootTest
@Configuration
@EnableAspectJAutoProxy
@ComponentScan(basePackages = "org.alext.learning")
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