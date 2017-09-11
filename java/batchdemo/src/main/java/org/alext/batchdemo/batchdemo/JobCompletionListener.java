package org.alext.batchdemo.batchdemo;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;

public class JobCompletionListener extends JobExecutionListenerSupport {

    @Override
    public void afterJob(JobExecution jobExecution) {

        switch (jobExecution.getStatus()) {
            case COMPLETED:
                System.out.println("BATCH JOB COMPLETED SUCCESSFULLY");
                break;
            case FAILED:
                System.out.println("BATCH JOB FAILED");
                break;
            default:
                System.out.println("JOB STATUS: "+jobExecution.getStatus());

        }

    }

}