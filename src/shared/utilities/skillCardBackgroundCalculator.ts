export const getStyling = (percentage: number) => {
  const remaining = 100 - percentage;
  const color = getFillColour(percentage);

  if (percentage < 50) {
    // gradient only works 50% and up so I had to get creative...
    return `linear-gradient(to left, white ${remaining}%, ${color} ${percentage}%)`;
  }

  return `linear-gradient(to right, ${color} ${percentage}%, white ${remaining}%)`;
};

const getFillColour = (percentage: number) => {
  if (percentage > 80) {
    return "rgba(101, 221, 131, 0.5)";
  }
  if (percentage > 50) {
    return "rgba(223, 162, 30, 0.5)";
  }

  return "rgba(190, 62, 62, 0.5)";
};
