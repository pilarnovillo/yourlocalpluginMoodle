package com.example;

import java.util.ArrayList;
import java.util.List;

public class TemaDto {
    private String nombre;
    private String id;
    private List<TopicoDto> topicos;
    private List<TopicoDto> topicosSoporte;

    public TemaDto(String nombre, String id) {
        this.nombre = nombre;
        this.id = id;
        this.topicos = new ArrayList<>();
        this.topicosSoporte = new ArrayList<>();
    }

    // Getters y setters
    public String getNombre() {
        return nombre;
    }

    // Getter for id
    public String getId() {
        return id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<TopicoDto> getTopicos() {
        return topicos;
    }

    public void setTopicos(List<TopicoDto> topicos) {
        this.topicos = topicos;
    }

    public List<TopicoDto> getTopicosSoporte() {
        return topicosSoporte;
    }

    public void setTopicosSoporte(List<TopicoDto> topicosSoporte) {
        this.topicosSoporte = topicosSoporte;
    }
}
