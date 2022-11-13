export function GetCurrentDate () {
  let today = new Date().toISOString().toString();
  let tomorrow = new Date(); 
  tomorrow.setDate(tomorrow.getDate() + 1);

  let weekly = new Date();
  weekly.setDate(weekly.getDate() - 6)
  

  return {
    today,
    tomorrow: tomorrow.toISOString().toString(),
    weekly: weekly.toISOString().toString(),
  }
}