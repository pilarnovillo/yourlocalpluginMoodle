package com.example;

public class RAAsignaturaDto {
    private String nombre;
    private String id;
    private VerboDto verbo;
    private String condicionDescripcion;
    private String condicionID;
    private String objetoDescripcion;
    private String objetoID;

    // Getter and Setter for nombre
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for verbo
    public VerboDto getVerbo() {
        return verbo;
    }

    public void setVerbo(VerboDto verbo) {
        this.verbo = verbo;
    }

    // Getter and Setter for condicionDescripcion
    public String getCondicionDescripcion() {
        return condicionDescripcion;
    }

    public void setCondicionDescripcion(String condicionDescripcion) {
        this.condicionDescripcion = condicionDescripcion;
    }

    // Getter and Setter for condicionID
    public String getCondicionID() {
        return condicionID;
    }

    public void setCondicionID(String condicionID) {
        this.condicionID = condicionID;
    }

    // Getter and Setter for objetoDescripcion
    public String getObjetoDescripcion() {
        return objetoDescripcion;
    }

    public void setObjetoDescripcion(String objetoDescripcion) {
        this.objetoDescripcion = objetoDescripcion;
    }

    // Getter and Setter for objetoID
    public String getObjetoID() {
        return objetoID;
    }

    public void setObjetoID(String objetoID) {
        this.objetoID = objetoID;
    }

}
