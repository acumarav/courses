package org.alext.batchdemo.batchdemo;

import java.nio.file.Paths;

public class Utils {

    public static String buildOutputPath(BatchDemoApplication.Asset asset) {
        java.nio.file.Path path = Paths.get(asset.getPath());
        String outFile = "out_" + path.getFileName().toString();
        java.nio.file.Path outfile = Paths.get(path.getParent().toString(), outFile);

        return outfile.toString();
    }
}
