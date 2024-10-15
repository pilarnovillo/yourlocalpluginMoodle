package com.example;

import java.util.List;

public class NodeDto {
    private String nombre;
    private String id;
    private String fullPath;
    private int level;
    private String relation;
    private List<NodeDto> children;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String name) {
        this.nombre = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getFullPath() {
        return fullPath;
    }

    public void setFullPath(String fullPath) {
        this.fullPath = fullPath;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public List<NodeDto> getChildren() {
        return children;
    }

    public void setChildren(List<NodeDto> children) {
        this.children = children;
    }
}
