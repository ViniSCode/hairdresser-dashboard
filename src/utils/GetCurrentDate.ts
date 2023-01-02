export function GetCurrentDate () {
  let today = new Date().toISOString().toString();
  let tomorrow = new Date(); 
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return {
    today,
    tomorrow: tomorrow.toISOString().toString(),
    filterDate: today,
  }

}