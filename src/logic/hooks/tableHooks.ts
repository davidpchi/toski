import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * This hook returns a set of values and setters that handle updating table filter values populated from the url parameters.
 * This also will update the history backstack so the filters are persisted.
 */
export const useTableFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // try to get the date out of the search params
    const dateFilterParamRaw = searchParams.get("fromDate");
    const dateFilterParam = dateFilterParamRaw !== null ? new Date(Number(dateFilterParamRaw)) ?? undefined : undefined;
    // try to get the qualified filter out of the search params
    const onlyQualifiedParamRaw = searchParams.get("onlyQualified");
    // the default value for the qualified param is true
    const onlyQualifiedParam = onlyQualifiedParamRaw !== null ? onlyQualifiedParamRaw === "true" : true;
    // try to get the free form name filter out of the search params
    const nameFilterParamRaw = searchParams.get("filter");
    const nameFilterParam = nameFilterParamRaw !== null ? nameFilterParamRaw : "";

    const [dateFilter, setDateFilter] = useState<Date | undefined>(dateFilterParam);
    const onDatePickerChange = useCallback((date: Date | undefined) => {
        setDateFilter(date);
    }, []);

    const [showOnlyQualfied, setShowOnlyQualified] = useState<boolean>(onlyQualifiedParam);
    const onShowOnlyQualifiedChange = () => {
        setShowOnlyQualified(!showOnlyQualfied);
    };

    const [searchInput, setSearchInput] = useState<string>(nameFilterParam);
    const onSearchChange = useCallback(
        (event: any) => {
            setSearchInput(event.target.value);
        },
        [setSearchInput]
    );

    // TODO: Temporarily disable this logic until we have more time to investigate this bug.
    // this useEffect is listening to all of the filter changes and applying to them to the search parameters
    // useEffect(() => {
    //     // date filter
    //     if (dateFilter) {
    //         searchParams.set("fromDate", dateFilter.getTime().toString());
    //     } else {
    //         searchParams.delete("fromDate");
    //     }

    //     // qualified filter
    //     // this will make sure that the qualified filter is always set in the url
    //     searchParams.set("onlyQualified", showOnlyQualfied.toString());

    //     if (searchInput) {
    //         searchParams.set("filter", searchInput);
    //     } else {
    //         searchParams.delete("filter");
    //     }

    //     setSearchParams(searchParams);
    // }, [dateFilter, nameFilterParam, searchInput, searchParams, setSearchParams, showOnlyQualfied]);

    return {
        dateFilter,
        showOnlyQualfied,
        searchInput,
        onDatePickerChange,
        onShowOnlyQualifiedChange,
        onSearchChange
    };
};
