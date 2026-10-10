package com.TaskPlannerApplication.common.QueryParams;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
@Setter
public class QueryParameters {
    private int page = 1; 
    private int limit = 10;
    private String sortBy = "createdAt";
    private String order = "asc";
}