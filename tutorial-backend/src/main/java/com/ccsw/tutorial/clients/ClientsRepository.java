package com.ccsw.tutorial.clients;

import com.ccsw.tutorial.clients.model.Clients;
import org.springframework.data.repository.CrudRepository;

/**
 * @author ccsw
 *
 */
public interface ClientsRepository extends CrudRepository<Clients, Long> {

    Clients findByName(String name);

}
