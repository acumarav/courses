package org.alext.batchdemo.batchdemo;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class TranscodingProcessorTest {

    private TranscodingProcessor processor=new TranscodingProcessor();

    @Test
    public void testRunProcessor() throws Exception {
        Asset tstAsset = new Asset();
        tstAsset.setPath("/var/www/dummy.mp4");
        processor.process(tstAsset);
    }

}