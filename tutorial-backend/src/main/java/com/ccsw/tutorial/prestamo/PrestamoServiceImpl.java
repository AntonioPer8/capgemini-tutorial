package com.ccsw.tutorial.prestamo;

import com.ccsw.tutorial.prestamo.model.Prestamo;
import com.ccsw.tutorial.prestamo.model.PrestamoDto;
import com.ccsw.tutorial.prestamo.model.PrestamoSearchDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class PrestamoServiceImpl implements PrestamoService {

    @Autowired
    PrestamoRepository prestamoRepository;

    @Override
    public Prestamo get(Long id) {
        return this.prestamoRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Prestamo> findPage(PrestamoSearchDto dto) {
        Pageable pageable = dto.getPageable().getPageable();

        String nameClient = dto.getNameClient();
        String nameGame = dto.getNameGame();
        LocalDate date = dto.getDate();
        System.out.println("fechaaaaaaaaaa:" + date);

        boolean tieneFiltros = (nameClient != null && !nameClient.trim().isEmpty()) || (nameGame != null && !nameGame.trim().isEmpty()) || date != null;

        if (tieneFiltros) {
            return prestamoRepository.findByFilters(nameGame, nameClient, date, pageable);
        }
        return prestamoRepository.findAll(pageable);
    }

    @Override
    public void save(Long id, PrestamoDto data) {

        LocalDate fechaInicio = data.getFechaInicio();
        LocalDate fechaFin = data.getFechaFin();

        if (fechaFin.isBefore(fechaInicio)) {
            throw new IllegalArgumentException("La fecha de fin no puede ser anterior a la fecha de inicio.");
        }

        long dias = java.time.temporal.ChronoUnit.DAYS.between(fechaInicio, fechaFin);
        if (dias > 14) {
            throw new IllegalArgumentException("El préstamo no puede exceder los 14 días.");
        }

        List<Prestamo> juegosPrestados = prestamoRepository.findPrestamosSolapadosPorJuego(data.getNameGame(), fechaInicio, fechaFin);

        if (!juegosPrestados.isEmpty()) {

            throw new IllegalArgumentException("Este juego ya está prestado en las fechas seleccionadas.");
        }

        List<Prestamo> prestamosCliente = prestamoRepository.findPrestamosSolapadosPorCliente(data.getNameClients(), fechaInicio, fechaFin);

        if (prestamosCliente.size() >= 2) {
            throw new IllegalArgumentException("El cliente ya tiene dos préstamos activos en las fechas indicadas.");
        }

        Prestamo prestamo = id == null ? new Prestamo() : this.get(id);
        BeanUtils.copyProperties(data, prestamo, "id");

        this.prestamoRepository.save(prestamo);
    }

    @Override
    public void delete(Long id) throws Exception {

        if (this.prestamoRepository.findById(id).orElse(null) == null) {
            throw new Exception("No existe el préstamo");
        }

        this.prestamoRepository.deleteById(id);
    }

    @Override
    public List<Prestamo> findAll() {
        return (List<Prestamo>) this.prestamoRepository.findAll();
    }

}