package org.alext.batchdemo.batchdemo;

import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersIncrementer;

public class TranscodingJob implements JobParametersIncrementer {

    private static String RUN_TRANSCODING_KEY = "run.transcodingId";
    private String key;

    public TranscodingJob() {
        this.key = RUN_TRANSCODING_KEY;
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
        String transcodingId = params.getString(this.key, null);
        return (new JobParametersBuilder(params)).addString(this.key, transcodingId).toJobParameters();
    }
}
