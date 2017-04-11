package org.alext.learning.services;

import org.alext.learning.domain.Issue;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.github.api.GitHubIssue;
import org.springframework.social.github.api.impl.GitHubTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by alex on 9/20/2016.
 */
@Service
public class IssueManager {

    @Value("${github.token}")
    private String githubToken;//GITHUB_TOKEN environment variable should be set

    @Value("${org}")
    private String org;

    @Value("${repos}")
    private String[] repos;

    GitHubTemplate gitHubTemplate = new GitHubTemplate(githubToken);

    public List<Issue> findOpenIssues() {
        List<Issue> openIssues = new ArrayList<>();

        for (String repo : repos) {
            final List<GitHubIssue> issues = gitHubTemplate
                    .repoOperations().getIssues(org, repo);

            for (GitHubIssue issue : issues) {
                if (issue.getState().equals("open")) {
                    openIssues.add(new Issue(repo, issue));
                }
            }
        }

        return openIssues;

    }
}