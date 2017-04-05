package org.alext.learning.services;

import org.alext.learning.model.Asset;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by alext on 4/5/2017.
 */

@Component
public class AssetService {

    public List<Asset> getAssets(int number) {
        List<Asset> assets = new ArrayList<Asset>(number);

        for (int i = 0; i < number; i++) {
            Asset ass = buildRandomAsset();
            assets.add(ass);
        }
        return assets;
    }

    private Asset buildRandomAsset() {
        int rnd = (int) (Math.random() * 100);
        Asset ass = new Asset(Integer.toString(rnd), rnd % 2 == 0, "Name_" + rnd, "_" + rnd);
        return ass;
    }
}
