function formatDate(dateString) {
  const date = new Date(dateString);

  // Format the time portion
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")}${ampm}`;

  // Format the date portion
  const formattedDate = `${date.getDate()}-${date.toLocaleString("default", {
    month: "short",
  })}-${date.getFullYear().toString().substr(-2)}, ${formattedTime}`;

  return formattedDate;
}

export default formatDate;
