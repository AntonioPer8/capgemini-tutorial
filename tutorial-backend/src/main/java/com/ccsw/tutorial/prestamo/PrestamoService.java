package com.ccsw.tutorial.prestamo;

import com.ccsw.tutorial.game.model.Game;
import com.ccsw.tutorial.prestamo.model.Prestamo;
import com.ccsw.tutorial.prestamo.model.PrestamoDto;
import com.ccsw.tutorial.prestamo.model.PrestamoSearchDto;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * @author ccsw
 *
 */
public interface PrestamoService {

    Prestamo get(Long id);

    /**
     * Recupera los juegos filtrando opcionalmente por título y/o categoría
     *
     * @return {@link List} de {@link Game}
     */
    Page<Prestamo> findPage(PrestamoSearchDto dto);

    /**
     * Guarda o modifica un juego, dependiendo de si el identificador está o no informado
     *
     * @param id PK de la entidad
     * @param dto datos de la entidad
     */
    void save(Long id, PrestamoDto dto);

    void delete(Long id) throws Exception;

    List<Prestamo> findAll();
}
