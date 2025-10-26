// We assign a permanent color to each category for consistent charts.
export const INCOME_CATEGORIES = [
  { name: "Salary", color: "#10B981" }, // Green
  { name: "Gifts", color: "#22C55E" },
  { name: "Other Income", color: "#84CC16" }, // Lime
];

export const EXPENSE_CATEGORIES = [
  // Needs
  { name: "Groceries", color: "#EF4444" }, // Red
  { name: "Rent/Mortgage", color: "#F97316" }, // Orange
  { name: "Bills & Utilities", color: "#F59E0B" }, // Amber
  { name: "Transport", color: "#0EA5E9" }, // Sky Blue
  { name: "Health", color: "#06B6D4" }, // Cyan

  // Wants
  { name: "Food & Drink", color: "#D946EF" }, // Fuchsia
  { name: "Shopping", color: "#EC4899" }, // Pink
  { name: "Entertainment", color: "#6366F1" }, // Indigo

  // Other
  { name: "Other", color: "#78716C" }, // Stone
];

// 2. Combine them into a single list for forms
// We just want the names for the dropdowns. .sort() keeps the list alphabetical.
export const ALL_CATEGORIES = [
  ...INCOME_CATEGORIES.map((c) => c.name),
  ...EXPENSE_CATEGORIES.map((c) => c.name),
].sort();

// 3. Create a Color Map for charts
// This turns the arrays into an object like: { Salary: '#10B981', Groceries: '#EF4444', ... }
// This allows the Insights page to look up the correct color for each category name.
export const CATEGORY_COLOR_MAP = [
  ...INCOME_CATEGORIES,
  ...EXPENSE_CATEGORIES,
].reduce((acc, cat) => {
  acc[cat.name] = cat.color;
  return acc;
}, {});
