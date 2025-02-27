package com.example;

import java.util.ArrayList;
import java.util.List;

public class UnidadDto {
    private String nombre;
    private String id;
    private List<TemaDto> temas;

    public UnidadDto(String nombre, String id) {
        this.nombre = nombre;
        this.id = id;
        this.temas = new ArrayList<>();
    }

    public String getNombre() {
        return nombre;
    }

    public String getId() {
        return id;
    }

    public List<TemaDto> getTemas() {
        return temas;
    }

    public void addTema(TemaDto tema) {
        this.temas.add(tema);
    }
}
