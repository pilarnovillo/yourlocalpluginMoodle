package com.example;

import java.util.List;

public class Slide {
    private List<Element> elements;
    

    // Constructor
    public Slide(List<Element> elements) {
        this.elements = elements;
    }

    public Slide() {
        //TODO Auto-generated constructor stub
    }

    // Getters y Setters
    public List<Element> getElements() {
        return elements;
    }

    public void setElements(List<Element> elements) {
        this.elements = elements;
    }

   
}

