package org.alext.views;

import com.vaadin.server.VaadinRequest;
import com.vaadin.spring.annotation.SpringUI;
import com.vaadin.ui.Grid;
import com.vaadin.ui.Label;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;
import org.alext.model.AssetBundle;
import org.alext.repository.AssetBundleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;

import java.util.stream.Stream;

@SpringUI(path = "/")
public class HomeUI extends UI {


    private final AssetBundleRepository repo;

    @Autowired
    public HomeUI(AssetBundleRepository repo) {
        this.repo = repo;
    }

    @Override
    protected void init(VaadinRequest vaadinRequest) {

        VerticalLayout layout = new VerticalLayout();

        layout.addComponent(new Label("UI Home page"));
        layout.addComponent(new Label("Hello world!"));
        Grid grid = new Grid(AssetBundle.class);


        grid.setDataProvider(
                (sortOrder, offset, limit) -> {

                    return repo.findAll().stream().skip(offset).limit(limit);
                    /*int page = limit > 0 ? offset / limit : 0;
                    PageRequest pr = new PageRequest(page, limit);
                    return Stream.of(repo.findAll(pr));*/
                },
                () -> repo.findAll().size()
        );

        grid.setSizeFull();
        layout.addComponent(grid);

        setContent(layout);
    }
}
