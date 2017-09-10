package org.alext.batchdemo.batchdemo;

import org.apache.commons.io.IOUtils;
import org.springframework.batch.item.ItemProcessor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class TranscodingProcessor implements ItemProcessor<BatchDemoApplication.Asset, BatchDemoApplication.Asset> {

    @Override
    public BatchDemoApplication.Asset process(BatchDemoApplication.Asset asset) throws Exception {

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



        /*
        *
        Runtime rt = Runtime.getRuntime();
String[] commands = {"system.exe","-get t"};
Process proc = rt.exec(commands);

BufferedReader stdInput = new BufferedReader(new
     InputStreamReader(proc.getInputStream()));

BufferedReader stdError = new BufferedReader(new
     InputStreamReader(proc.getErrorStream()));

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
        * */

        asset.setPath("Done!");
        return asset;
    }


}
