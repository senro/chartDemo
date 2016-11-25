package rml.service;

import rml.model.PriceIndex;
import rml.model.Page;
import rml.model.PageResult;

public interface PriceIndexServiceI {
    PageResult getAll(Page page);

    PriceIndex getPriceIndexById(int id);

    PriceIndex selectByPrimaryKey(int id);

    int insert(PriceIndex priceIndex);

    int update(PriceIndex priceIndex);

    int delete(int id);
}
