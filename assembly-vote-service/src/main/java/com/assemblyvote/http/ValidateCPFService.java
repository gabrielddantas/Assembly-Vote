package com.assemblyvote.http;

import com.assemblyvote.models.request.CPFRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "validateCpfService", url = "${origin.validation}")
public interface ValidateCPFService {

  @RequestMapping(method = RequestMethod.GET, value = "/cpf/valid/{cpf}")
  CPFRequest checkCPF(@PathVariable("cpf") String cpf);
}
