package org.alext.batchdemo.batchdemo;

import org.apache.commons.io.IOUtils;
import org.springframework.batch.item.ItemProcessor;

import java.io.OutputStream;

public class TranscodingProcessor implements ItemProcessor<BatchDemoApplication.Asset, BatchDemoApplication.Asset> {

    @Override
    public BatchDemoApplication.Asset process(BatchDemoApplication.Asset asset) throws Exception {

        ProcessBuilder prBuilder = new ProcessBuilder("ffmpeg");
        Process ps = prBuilder.start();

        IOUtils.copy(ps.getInputStream(), System.out);

        while (ps.isAlive()) {
            Thread.sleep(1000);
        }

        asset.setPath("Done!");
        return asset;
    }


}
