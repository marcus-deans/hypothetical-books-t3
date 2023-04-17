export const numericFormatter = new Intl.DateTimeFormat("en-US");
export const longFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});
