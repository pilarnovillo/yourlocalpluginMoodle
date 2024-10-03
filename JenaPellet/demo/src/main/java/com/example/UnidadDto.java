package com.example;

import java.util.ArrayList;
import java.util.List;

public class UnidadDto {
    private String nombre;
    private List<TemaDto> temas;

    public UnidadDto(String nombre) {
        this.nombre = nombre;
        this.temas = new ArrayList<>();
    }

    public String getNombre() {
        return nombre;
    }

    public List<TemaDto> getTemas() {
        return temas;
    }

    public void addTema(TemaDto tema) {
        this.temas.add(tema);
    }
}



