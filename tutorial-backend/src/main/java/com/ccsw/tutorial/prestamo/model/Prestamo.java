package com.ccsw.tutorial.prestamo.model;

import jakarta.persistence.*;

import java.time.LocalDate;

/**
 * @author ccsw
 *
 */
@Entity
@Table(name = "prestamo")
public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "namegame", nullable = false)
    private String namegame;

    @Column(name = "nameclients", nullable = false)
    private String nameclients;

    @Column(name = "fechainicio", nullable = false)
    private LocalDate fechainicio;

    @Column(name = "fechafin", nullable = false)
    private LocalDate fechafin;

    public LocalDate getFechaInicio() {
        return fechainicio;
    }

    public void setFechaInicio(LocalDate fechainicio) {
        this.fechainicio = fechainicio;
    }

    public LocalDate getFechaFin() {
        return fechafin;
    }

    public void setFechaFin(LocalDate fechafin) {
        this.fechafin = fechafin;
    }

    /**
     * @return id
     */
    public Long getId() {

        return this.id;
    }

    /**
     * @param id new value of {@link #getId}.
     */
    public void setId(Long id) {

        this.id = id;
    }

    /**
     * @return fechaInicio
     */
    public String getNameGame() {
        return namegame;
    }

    public void setNameGame(String namegame) {
        this.namegame = namegame;
    }

    public String getNameClients() {
        return nameclients;
    }

    public void setNameClients(String nameclients) {
        this.nameclients = nameclients;
    }
}