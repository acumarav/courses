package org.alext.learning.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "assets")
public class Asset {

    @Id
    @SequenceGenerator(name="assets_seq", sequenceName = "assets_seq")
    private Long id;

    @Column
    private String name;

    @Column
    private String Description;
}
