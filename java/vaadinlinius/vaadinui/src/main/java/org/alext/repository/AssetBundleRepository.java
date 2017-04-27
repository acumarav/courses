package org.alext.repository;

import org.alext.model.AssetBundle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AssetBundleRepository extends JpaRepository<AssetBundle,Long> {
}
