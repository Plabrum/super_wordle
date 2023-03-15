export function format_time(time: number | null) {
  if (time) {
    const elapsedDate = new Date(Date.parse("01 Jan 1970 00:00:00") + time);
    const hours = elapsedDate.getHours().toString().padStart(2, "0");
    const minutes = elapsedDate.getMinutes().toString().padStart(2, "0");
    const seconds = elapsedDate.getSeconds().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}:${seconds}`;
    return timeString;
  } else {
    return "error";
  }
}
