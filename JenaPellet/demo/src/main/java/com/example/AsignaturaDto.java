package com.example;

import java.util.ArrayList;
import java.util.List;

public class AsignaturaDto {
    private String nombre;              // Name of the Asignatura
    private String id;
    private List<RAAsignaturaDto> raAsignaturaList;
    private List<UnidadDto> unidades;   // List of UnidadDto
    private List<VerboDto> verbosList;

    // Constructor
    public AsignaturaDto(String nombre, String id) {
        this.nombre = nombre;
        this.id = id;
        this.unidades = new ArrayList<>();
    }

    // Getter for nombre
    public String getNombre() {
        return nombre;
    }

    // Getter for id
    public String getId() {
        return id;
    }

    // Getter for unidades
    public List<UnidadDto> getUnidades() {
        return unidades;
    }

    // Getter for unidades
    public List<RAAsignaturaDto> getRaAsignaturaList() {
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
    public void setRAAsignaturaList(List<RAAsignaturaDto> raAsignaturaList) {
        this.raAsignaturaList = raAsignaturaList;
    }

    // Method to add a UnidadDto to the list
    public void addRAAsignatura(RAAsignaturaDto raAsignatura) {
        this.raAsignaturaList.add(raAsignatura);
    }

    // Getter for unidades
    public List<VerboDto> getVerbosList() {
        return verbosList;
    }

    // Method to add a UnidadDto to the list
    public void setVerbosList(List<VerboDto> verbosList) {
        this.verbosList = verbosList;
    }
}
