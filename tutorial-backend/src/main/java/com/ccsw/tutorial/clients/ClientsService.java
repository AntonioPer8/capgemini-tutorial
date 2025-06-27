package com.ccsw.tutorial.clients;

import com.ccsw.tutorial.clients.model.Clients;
import com.ccsw.tutorial.clients.model.ClientsDto;

import java.util.List;

/**
 * @author ccsw
 *
 */
public interface ClientsService {

    /**
     * Método para recuperar todas las {@link Clients}
     *
     * @return {@link List} de {@link Clients}
     */
    List<Clients> findAll();

    /**
     * Método para crear o actualizar una {@link Clients}
     *
     * @param id PK de la entidad
     * @param dto datos de la entidad
     */
    void save(Long id, ClientsDto dto);

    /**
     * Método para borrar una {@link Clients}
     *
     * @param id PK de la entidad
     */
    void delete(Long id) throws Exception;

}