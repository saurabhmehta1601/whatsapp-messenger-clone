export const getFormattedTime = (time: number): string => {
  const d = new Date(time);
  //   if message is today then show time
  if (d.getDate() === new Date().getDate()) {
    // show time in am and pm format
    return `${d.getHours() % 12 || 12}:${
      d.getMinutes() < 10 ? "0" : ""
    }${d.getMinutes()} ${d.getHours() >= 12 ? "PM" : "AM"}`;
  }
  return "Earlier message";
};
