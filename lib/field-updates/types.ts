export type FieldUpdateItem = {
  title: string;
  dateLabel: string;
  dateIso: string;
  excerpt?: string;
  url: string;
};

export type FieldUpdatesData =
  | {
      status: "ok";
      items: FieldUpdateItem[];
      fetchedAt: string;
    }
  | {
      status: "unavailable";
      fetchedAt: string;
    };
