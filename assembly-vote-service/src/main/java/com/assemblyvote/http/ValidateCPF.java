package com.assemblyvote.http;

import com.assemblyvote.exception.BadRequestException;
import com.assemblyvote.models.request.CPFRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ValidateCPF {

  private final String URL = "http://localhost:3001/api";
  private final RestTemplate restTemplate;

  public CPFRequest validateCPF(String cpf) throws BadRequestException {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    String Url = URL + "/cpf/valid/" + cpf;

    CPFRequest responseEntity;
    try {
      responseEntity = restTemplate.getForEntity(Url, CPFRequest.class).getBody();
    } catch (Exception e) {
      throw new BadRequestException("Erro ao validar CPF");
    }

    return responseEntity;
  }
}
