package com.ccsw.tutorial.prestamo.model;

import java.time.LocalDate;

/**
 * @author ccsw
 *
 */
public class PrestamoDto {

    private Long id;

    private String nameclients;

    private String namegame;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameClients() {
        return nameclients;
    }

    public void setNameClients(String nameclients) {
        this.nameclients = nameclients;
    }

    public String getNameGame() {
        return namegame;
    }

    public void setNameGame(String namegame) {
        this.namegame = namegame;
    }
}
