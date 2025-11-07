import { useCallback, useMemo, useState } from "react";

export default function useTableSort({
  initialKey = "name",
  initialDirection = "ascending",
  dateKeyMap = {},
} = {}) {
  const [sortConfig, setSortConfig] = useState({
    key: initialKey,
    direction: initialDirection,
  });

  const dateKeys = useMemo(
    () => new Set(Object.values(dateKeyMap)),
    [dateKeyMap]
  );

  const sortData = useCallback(
    (
      data,
      key = sortConfig.key,
      direction = sortConfig.direction,
      columns = []
    ) => {
      const column = columns.find((col) => col.key === key);
      const actualKey = dateKeyMap[key] || key;

      return [...(data || [])].sort((a, b) => {
        let aVal, bVal;

        // Use column.sortValue if provided
        if (column?.sortValue) {
          aVal = column.sortValue(a);
          bVal = column.sortValue(b);
        } else if (dateKeys.has(actualKey)) {
          aVal = a?.[actualKey] ? new Date(a[actualKey]).getTime() : 0;
          bVal = b?.[actualKey] ? new Date(b[actualKey]).getTime() : 0;
        } else {
          aVal = a?.[actualKey];
          bVal = b?.[actualKey];
        }

        // Coerce numbers for numeric comparison
        if (typeof aVal === "string" && !isNaN(aVal)) aVal = Number(aVal);
        if (typeof bVal === "string" && !isNaN(bVal)) bVal = Number(bVal);

        // Coerce undefined/null to empty string for string comparison
        if (aVal === undefined || aVal === null) aVal = "";
        if (bVal === undefined || bVal === null) bVal = "";

        // Final comparison
        if (aVal < bVal) return direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return direction === "ascending" ? 1 : -1;
        return 0;
      });
    },
    [dateKeyMap, dateKeys, sortConfig]
  );

  const requestSort = useCallback(
    (key, data, setData, columns = []) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
      if (data && setData) setData(sortData(data, key, direction, columns));
    },
    [sortConfig, sortData]
  );

  return { sortConfig, requestSort, sortData, setSortConfig };
}
