export const colorProgress = (value) => {
  if (value>=8) return "green.500"
  else if(value>=6.5) return "yellow.500"
  else return "red.500"
}