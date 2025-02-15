export interface InventoryItem {
    _id: string;
    name: string;
    status: string;
    condition: string;
    borrower?: string | null;
    dueDate?: string | null;
  }
  