const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const timeToString = function(second){
  let timeString = "";
  let sec = Math.floor(second % 60);
  sec = (sec + "").padStart(2, "0");


  let min = Math.floor(second / 60);
  min = (min + "").padStart(2, "0");


  timeString =  min+":"+sec;

  return timeString;
}

export default {
  formatTime,
  timeToString
}
