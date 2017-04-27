package org.alext.views;

import com.vaadin.server.VaadinRequest;
import com.vaadin.spring.annotation.SpringUI;
import com.vaadin.ui.Label;
import com.vaadin.ui.UI;
import com.vaadin.ui.VerticalLayout;

@SpringUI(path = "/")
public class HomeUI extends UI {
    @Override
    protected void init(VaadinRequest vaadinRequest) {

        VerticalLayout layout=new VerticalLayout();

        layout.addComponent(new Label("UI Home page"));
        layout.addComponent(new Label("Hello world!"));

        setContent(layout);
    }
}
