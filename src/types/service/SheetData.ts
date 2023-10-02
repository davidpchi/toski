export type SheetData = {
    table: SheetTable;
};

export type SheetTable = {
    cols: SheetCol[];
    rows: SheetRow[];
};

export type SheetCol = {
    id: string;
    label: string;
    type: string;
    pattern: string;
};

export type SheetRow = {
    c: (SheetCell | null)[];
};

export type SheetCell = {
    v: string | number;
    f: string | undefined;
};
