 function formatDate(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month}/${day}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
}
function randomSeed(){
  const randomInt = Math.floor(Math.random() * 100); // Adjust the range as needed
const randomIntAsString = randomInt.toString();
  return randomIntAsString;
}
module.exports =  formatDate ;