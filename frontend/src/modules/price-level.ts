export function stringyfyPriceLevel(price?: number) {
  switch (price) {
    case 1:
      return "Cheap";
    case 2:
      return "Moderate";
    case 3:
      return "Expensive";
    case 4:
      return "Very Expensive";
    default:
      return "Unknown";
  }
}
