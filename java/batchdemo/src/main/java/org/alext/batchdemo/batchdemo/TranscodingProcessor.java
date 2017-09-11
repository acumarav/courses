package org.alext.batchdemo.batchdemo;

import org.apache.commons.io.IOUtils;
import org.springframework.batch.item.ItemProcessor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class TranscodingProcessor implements ItemProcessor<Asset, Asset> {

    @Override
    public Asset process(Asset asset) throws Exception {

        ProcessBuilder prBuilder = new ProcessBuilder("ffmpeg");
        Process proc = prBuilder.start();

        BufferedReader stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
        BufferedReader stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));

        // read the output from the command
        System.out.println("Here is the standard output of the command:\n");
        String s = null;
        while ((s = stdInput.readLine()) != null) {
            System.out.println(s);
        }

        // read any errors from the attempted command
        System.out.println("Here is the standard error of the command (if any):\n");
        while ((s = stdError.readLine()) != null) {
            System.out.println(s);
        }

        if (Math.random() > 0.5) {
            System.out.println("Going to fail the job...");
            System.err.println("Going to fail the job...");
            throw new RuntimeException("Job Failed!");
        }

        String outPath = Utils.buildOutputPath(asset);
        asset.setPath(outPath);

        return asset;
    }


}
