package com.example;

import java.util.ArrayList;
import java.util.List;

public class TemaDto {
    private String nombre;
    private List<TopicoDto> topicos;
    private List<TopicoDto> topicosSoporte;

    public TemaDto(String nombre) {
        this.nombre = nombre;
        this.topicos = new ArrayList<>();
        this.topicosSoporte = new ArrayList<>();
    }

    // Getters y setters
    public String getNombre() {
        return nombre;
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
