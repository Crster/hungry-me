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

export function colorfyPriceLevel(price?: number) {
  switch (price) {
    case 1:
      return "text-green-500";
    case 2:
      return "text-yellow-500";
    case 3:
      return "text-orange-500";
    case 4:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
