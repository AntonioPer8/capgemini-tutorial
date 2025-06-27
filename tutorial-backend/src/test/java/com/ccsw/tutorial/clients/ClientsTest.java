package com.ccsw.tutorial.clients;

import com.ccsw.tutorial.clients.model.Clients;
import com.ccsw.tutorial.clients.model.ClientsDto;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClientsTest {

    @Mock
    private ClientsRepository clientsRepository;

    @InjectMocks
    private ClientsServiceImpl clientsService;

    @Test
    public void findAllShouldReturnAllClients() {

        List<Clients> list = new ArrayList<>();
        list.add(mock(Clients.class));

        when(clientsRepository.findAll()).thenReturn(list);

        List<Clients> clients = clientsService.findAll();

        assertNotNull(clients);
        assertEquals(1, clients.size());
    }

    public static final String CLIENTS_NAME = "CAT1";

    @Test
    public void saveNotExistsClientsIdShouldInsert() {

        ClientsDto clientsDto = new ClientsDto();
        clientsDto.setName(CLIENTS_NAME);

        ArgumentCaptor<Clients> clients = ArgumentCaptor.forClass(Clients.class);

        clientsService.save(null, clientsDto);

        verify(clientsRepository).save(clients.capture());

        assertEquals(CLIENTS_NAME, clients.getValue().getName());
    }

    public static final Long EXISTS_CLIENTS_ID = 1L;

    @Test
    public void saveExistsCategoryIdShouldUpdate() {

        ClientsDto clientsDto = new ClientsDto();
        clientsDto.setName(CLIENTS_NAME);

        Clients category = mock(Clients.class);
        when(clientsRepository.findById(EXISTS_CLIENTS_ID)).thenReturn(Optional.of(category));

        clientsService.save(EXISTS_CLIENTS_ID, clientsDto);

        verify(clientsRepository).save(category);
    }

    @Test
    public void deleteExistsCategoryIdShouldDelete() throws Exception {

        Clients category = mock(Clients.class);
        when(clientsRepository.findById(EXISTS_CLIENTS_ID)).thenReturn(Optional.of(category));

        clientsService.delete(EXISTS_CLIENTS_ID);

        verify(clientsRepository).deleteById(EXISTS_CLIENTS_ID);
    }
}
