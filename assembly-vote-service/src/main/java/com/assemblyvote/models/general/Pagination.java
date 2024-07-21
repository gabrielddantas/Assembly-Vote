package com.assemblyvote.models.general;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Data
@Builder
@AllArgsConstructor
public class Pagination {
    private int size;
    private int page;
    private int numberOfElements;
    private int numberOfPages;
    private Long totalNumberOfElements;
    private boolean isFirstPage;
    private boolean isLastPage;
    private boolean hasNextPage;
    private boolean hasPreviousPage;

    public static Pagination from(Page<?> page, Pageable pageable) {
        return Pagination.builder()
                .size(pageable.getPageSize())
                .numberOfElements(page.getNumberOfElements())
                .numberOfPages(page.getTotalPages())
                .totalNumberOfElements(page.getTotalElements())
                .isFirstPage(page.isFirst())
                .isLastPage(page.isLast())
                .hasNextPage(page.hasNext())
                .hasPreviousPage(page.hasPrevious())
                .page(pageable.getPageNumber())
                .build();
    }

}
