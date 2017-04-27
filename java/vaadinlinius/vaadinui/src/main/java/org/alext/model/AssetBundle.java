package org.alext.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.alext.utils.LocalDateTimeAttributeConverter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "asset_bundles")
public class AssetBundle {
    @Id
    @SequenceGenerator(name = "asset_bundles_id_seq", sequenceName = "asset_bundles_id_seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "asset_bundles_id_seq")
    private Long id;
    @Column
    private String name;
    @Column
    private String description;
    @Column(insertable = false, updatable = false)
    @Convert(converter = LocalDateTimeAttributeConverter.class)
    private LocalDateTime created;

}