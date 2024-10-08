package com.example;

public class Element {

    private String library;
    private String type;
    
    private Object params; // Puede ser un objeto que se especialice según el tipo de acción (AdvancedText, Image, MultiChoice, etc.)
    private String text;
    private String imagePath;

    // Constructor
    public Element( String library, Object params) {
        this.library = library;
        this.params = params;
    }


    public Element() {
        //TODO Auto-generated constructor stub
    }


    public String getLibrary() {
        return library;
    }

    public void setLibrary(String library) {
        this.library = library;
    }

    public Object getParams() {
        return params;
    }

    public void setParams(Object params) {
        this.params = params;
    }


    public void setType(String type) {
        this.type=type;
    }

    public String getType() {
        return type;
    }


    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }


    public void setImagePath(String path) {
        this.imagePath = path;
    }

    public String getLImagePath() {
        return imagePath;
    }
}
