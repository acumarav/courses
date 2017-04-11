package org.alext.learning.domain;

import org.springframework.social.github.api.GitHubIssue;

/**
 * Created by alex on 9/20/2016.
 */
public class Issue {

    private String repo;
    private GitHubIssue githubIssue;

    public Issue(String repo, GitHubIssue gitHubIssue) {
        this.repo = repo;
        this.githubIssue = gitHubIssue;
    }

    public String getRepo() {
        return repo;
    }

    public GitHubIssue getGithubIssue() {
        return githubIssue;
    }
}
