package org.alext.batchdemo.batchdemo;

import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersIncrementer;

public class TranscodingJob implements JobParametersIncrementer {

    private static String RUN_TRANSCODING_KEY = "run.id";
    private static String RUN_TRANSCODING_FILE = "run.transcodingFile";
    private String key;
    private String file;

    public TranscodingJob() {
        this.key = RUN_TRANSCODING_KEY;
        this.file = RUN_TRANSCODING_FILE;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public JobParameters getNext(JobParameters parameters) {

        /*JobParameters params = parameters == null ? new JobParameters() : parameters;
        long id = params.getLong(this.key, 0L).longValue() + 1L;
        return (new JobParametersBuilder(params)).addLong(this.key, id).toJobParameters();*/

        JobParameters params = parameters == null ? new JobParameters() : parameters;
        long id = params.getLong(this.key, 0L).longValue() + 1L;
        String transcodingFile = params.getString(this.file, null);
        JobParametersBuilder jobParametersBuilder = new JobParametersBuilder(params);
        jobParametersBuilder.addLong(this.key, id).addString(this.file, transcodingFile);
        return jobParametersBuilder.toJobParameters();
    }
}
