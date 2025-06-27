package com.ccsw.tutorial.clients;

import com.ccsw.tutorial.clients.model.Clients;
import com.ccsw.tutorial.clients.model.ClientsDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ccsw
 *
 */
@Service
@Transactional
public class ClientsServiceImpl implements ClientsService {

    @Autowired
    ClientsRepository clientsRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Clients> findAll() {
        return (List<Clients>) this.clientsRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void save(Long id, ClientsDto dto) {
        Clients clients;

        // Validación del nombre del cliente
        boolean clientExists = this.clientsRepository.findByName(dto.getName()) != null;
        if (clientExists) {
            throw new RuntimeException("El cliente ya existe");
        }

        if (id == null) {
            clients = new Clients();
        } else {
            clients = this.clientsRepository.findById(id).orElse(null);
        }

        clients.setName(dto.getName());

        this.clientsRepository.save(clients);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) throws Exception {
        if (this.clientsRepository.findById(id).orElse(null) == null) {
            throw new Exception("Not exists");
        }

        this.clientsRepository.deleteById(id);
    }
}
