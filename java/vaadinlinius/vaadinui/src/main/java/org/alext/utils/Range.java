package org.alext.utils;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class Range implements Pageable {

    private final int startIndex;
    private final int limit;
    private final String sortBy;

    public Range(int startIndex, int limit, String sortBy) {
        this.startIndex = startIndex;
        this.limit = limit;
        this.sortBy = sortBy;
    }

    @Override
    public int getPageSize() {
        return limit;
    }

    @Override
    public int getOffset() {
        return startIndex;
    }

    @Override
    public Sort getSort() {
        if (sortBy != null && !sortBy.equalsIgnoreCase(""))
            return new Sort(Sort.Direction.ASC, sortBy);
        else
            return new Sort(Sort.Direction.ASC, "id");
    }

    @Override
    public int getPageNumber() {
        return 0;
    }

    @Override
    public Pageable next() {
        return null;
    }

    @Override
    public Pageable previousOrFirst() {
        return null;
    }

    @Override
    public Pageable first() {
        return null;
    }

    @Override
    public boolean hasPrevious() {
        return false;
    }
}
