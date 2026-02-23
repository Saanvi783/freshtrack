import { useState, useEffect, useCallback } from "react";

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  expiryDate: string;
  cost: number;
  addedAt: string;
}

const STORAGE_KEY = "freshtrack_items";

function loadItems(): GroceryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveItems(items: GroceryItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function categorizeItem(item: GroceryItem): "eat-soon" | "fresh" | "expired" {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(item.expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return "expired";
  if (diffDays <= 2) return "eat-soon";
  return "fresh";
}

export function getDaysLeft(item: GroceryItem): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(item.expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function useGroceryStore() {
  const [items, setItems] = useState<GroceryItem[]>(loadItems);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const addItem = useCallback((item: Omit<GroceryItem, "id" | "addedAt">) => {
    const newItem: GroceryItem = {
      ...item,
      id: crypto.randomUUID(),
      addedAt: new Date().toISOString(),
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const eatSoon = items.filter((i) => categorizeItem(i) === "eat-soon");
  const fresh = items.filter((i) => categorizeItem(i) === "fresh");
  const expired = items.filter((i) => categorizeItem(i) === "expired");

  const totalSaved = fresh.reduce((sum, i) => sum + i.cost, 0) + eatSoon.reduce((sum, i) => sum + i.cost, 0);
  const totalWasted = expired.reduce((sum, i) => sum + i.cost, 0);
  const itemsRescued = eatSoon.length + fresh.length;

  return { items, addItem, removeItem, eatSoon, fresh, expired, totalSaved, totalWasted, itemsRescued };
}
