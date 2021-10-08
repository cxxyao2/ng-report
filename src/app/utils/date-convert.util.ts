export function convertDateToYYYYmmDD(argDate: Date): string {
  const year = argDate.getFullYear();
  const month = argDate.getMonth() + 1;
  const day = argDate.getDate();

  const monthString = month.toString();
  const dayString = day.toString();
  const finalMonth = monthString.padStart(2, '0'); // 01,02,..12
  const finalDay = dayString.padStart(2, '0'); // 01,02,...31

  // YYYY-mm-DD
  const dateString = year.toString() + '-' + finalMonth + '-' + finalDay;
  return dateString;
}
