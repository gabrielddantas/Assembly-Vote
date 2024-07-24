package com.assemblyvote.utils.converters;

import com.assemblyvote.models.general.Pagination;
import com.assemblyvote.models.response.PaginatedData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class PaginationConverter {
  public static <T> PaginatedData<T> toPaginatedData(Page<T> page, Pageable pageable) {
    return new PaginatedData<>(page.getContent(), Pagination.from(page, pageable));
  }
}
