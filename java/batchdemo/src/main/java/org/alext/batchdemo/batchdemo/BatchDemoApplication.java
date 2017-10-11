package org.alext.batchdemo.batchdemo;

import javafx.scene.shape.Path;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;

import javax.sql.DataSource;
import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

import static java.lang.System.setProperty;


@EnableBatchProcessing
@SpringBootApplication
public class BatchDemoApplication {

    @Bean
    FlatFileItemReader<Asset> fileReader(@Value("${input}") Resource in) throws Exception {
        FlatFileItemReader builder = new FlatFileItemReaderBuilder<Asset>()
                .name("file-reader")
                .resource(in)
                .targetType(Asset.class)
                .delimited().delimiter(",").names(new String[]{"inUrl"})
                .build();
        return builder;
    }

    @Bean
    JdbcBatchItemWriter<Asset> jdbcBatchItemWriter(DataSource ds) {
        return new JdbcBatchItemWriterBuilder<Asset>()
                .dataSource(ds)
                .sql("insert into Assets(path) Values (:path)")
                .beanMapped()
                .build();
    }


    @Bean
    Job job(JobBuilderFactory jbf, StepBuilderFactory sbf,
            ItemReader<? extends Asset> ir, ItemWriter<? super Asset> iw) {

        Step s1 = sbf.get("find-file").<Asset, Asset>chunk(1)
                .reader(ir)
                .processor(new TranscodingProcessor())
                .writer(iw).build();

        return jbf.get("etl")
                //.incrementer(new RunIdIncrementer())
                .incrementer(new TranscodingJob())
                .listener(listener())
                .start(s1).build();
    }

    @Bean
    public JobExecutionListener listener() {
        return new JobCompletionListener();
    }

    public static void main(String[] args) throws URISyntaxException {

//        File inFile = new File("d:\\projects\\courses\\java\\batchdemo\\assetsList.csv");
        URL res = BatchDemoApplication.class.getResource("/assetsList.csv");
        String inPath = Paths.get(res.toURI()).toAbsolutePath().toString();

        //setProperty("input", "file:///" + inFile.getAbsolutePath());
        setProperty("input", "file://" + inPath);
        setProperty("output", new File("file://" + "/out.txt").getAbsolutePath());
        SpringApplication.run(BatchDemoApplication.class, args);
    }
}
