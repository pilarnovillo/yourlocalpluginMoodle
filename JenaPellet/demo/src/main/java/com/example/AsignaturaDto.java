package com.example;

import java.util.ArrayList;
import java.util.List;

public class AsignaturaDto {
    private String nombre;              // Name of the Asignatura
    private List<String> raAsignaturaList;
    private List<UnidadDto> unidades;   // List of UnidadDto

    // Constructor
    public AsignaturaDto(String nombre) {
        this.nombre = nombre;
        this.unidades = new ArrayList<>();
    }

    // Getter for nombre
    public String getNombre() {
        return nombre;
    }

    // Getter for unidades
    public List<UnidadDto> getUnidades() {
        return unidades;
    }

    // Getter for unidades
    public List<String> getRaAsignaturaList() {
        return raAsignaturaList;
    }

    // Method to add a UnidadDto to the list
    public void addUnidad(UnidadDto unidad) {
        this.unidades.add(unidad);
    }

    // Method to add a UnidadDto to the list
    public void setUnidades(List<UnidadDto> unidades) {
        this.unidades = unidades;
    }

    // Method to add a UnidadDto to the list
    public void setRAAsignaturaList(List<String> raAsignaturaList) {
        this.raAsignaturaList = raAsignaturaList;
    }

    // Method to add a UnidadDto to the list
    public void addRAAsignatura(String raAsignatura) {
        this.raAsignaturaList.add(raAsignatura);
    }
}
