package com.ccsw.tutorial.prestamo;

import com.ccsw.tutorial.prestamo.model.Prestamo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

/**
 * @author ccsw
 *
 */
public interface PrestamoRepository extends CrudRepository<Prestamo, Long> {

    Page<Prestamo> findAll(Pageable pageable);

    @Query("SELECT p FROM Prestamo p WHERE p.namegame = :nameGame AND " + "(:fechaInicio <= p.fechafin AND :fechaFin >= p.fechainicio)")
    List<Prestamo> findPrestamosSolapadosPorJuego(@Param("nameGame") String nameGame, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    @Query("SELECT p FROM Prestamo p WHERE p.nameclients = :nameClients AND " + "(:fechaInicio <= p.fechafin AND :fechaFin >= p.fechainicio)")
    List<Prestamo> findPrestamosSolapadosPorCliente(@Param("nameClients") String nameClients, @Param("fechaInicio") LocalDate fechaInicio, @Param("fechaFin") LocalDate fechaFin);

    @Query("SELECT p FROM Prestamo p " + "WHERE (:nameGame IS NULL OR p.namegame = :nameGame) " + "AND (:nameClient IS NULL OR p.nameclients = :nameClient) " + "AND (:date IS NULL OR p.fechainicio <= :date AND p.fechafin >= :date)")
    Page<Prestamo> findByFilters(@Param("nameGame") String nameGame, @Param("nameClient") String nameClient, @Param("date") LocalDate date, Pageable pageable);
}
