package com.assemblyvote.service;

import com.assemblyvote.exception.ExistsException;
import com.assemblyvote.models.entity.Associate;
import com.assemblyvote.repository.AssociateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssociateService {

  private final AssociateRepository associateRepository;

  public Associate save(Associate associate) throws ExistsException {
    if (findByCpf(associate.getCpf()).isPresent()) {
      throw new ExistsException("O associado já se encontra cadastrado");
    }

    return associateRepository.save(associate);
  }

  public Optional<Associate> findByCpf(String cpf) {
    return associateRepository.findByCpf(cpf);
  }

  public Optional<Associate> findById(Long id) {
    return associateRepository.findById(id);
  }
}
