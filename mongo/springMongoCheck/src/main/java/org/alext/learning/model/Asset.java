package org.alext.learning.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Asset {
    @Id
    private String id;
    private boolean active = true;
    private String name;
    private String externalId;

    public Asset(String id, boolean active, String name, String externalId) {
        this.id = id;
        this.active = active;
        this.name = name;
        this.externalId = externalId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (!(o instanceof Asset)) return false;

        Asset asset = (Asset) o;

        return new org.apache.commons.lang3.builder.EqualsBuilder()
                .append(isActive(), asset.isActive())
                .append(getId(), asset.getId())
                .append(getName(), asset.getName())
                .append(getExternalId(), asset.getExternalId())
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new org.apache.commons.lang3.builder.HashCodeBuilder(17, 37)
                .append(getId())
                .append(isActive())
                .append(getName())
                .append(getExternalId())
                .toHashCode();
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id='" + id + '\'' +
                ", active=" + active +
                ", name='" + name + '\'' +
                ", externalId='" + externalId + '\'' +
                '}';
    }
}
