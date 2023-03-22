let time = new Date();
function a(number) {
  if (number < 10) {
    return (number = "0" + number);
  }
  return number;
}
function date() {
  return `${a(time.getHours())}:${a(
    time.getMinutes()
  )}-${time.getDay()}.${time.getMonth()}.${time.getFullYear()}`;
}

module.exports = date;
