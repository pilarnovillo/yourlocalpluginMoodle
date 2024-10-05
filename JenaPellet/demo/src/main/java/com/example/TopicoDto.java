package com.example;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class TopicoDto {
    private String nombre;
    private String id;
    private List<TopicoDto> parte;
    private List<TopicoDto> tipo;
    private List<TopicoDto> soporte;

    public TopicoDto(String nombre, String id) {
        this.nombre = nombre;
        this.id = id;
        this.parte = new ArrayList<>();
        this.tipo = new ArrayList<>();
        this.soporte = new ArrayList<>();
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

    public List<TopicoDto> getParte() {
        return parte;
    }

    public void setParte(List<TopicoDto> parte) {
        this.parte = parte;
    }

    public List<TopicoDto> getTipo() {
        return tipo;
    }

    public void setTipo(List<TopicoDto> tipo) {
        this.tipo = tipo;
    }

    public List<TopicoDto> getSoporte() {
        return soporte;
    }

    public void setSoporte(List<TopicoDto> soporte) {
        this.soporte = soporte;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TopicoDto topico = (TopicoDto) o;
        return Objects.equals(id, topico.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}


