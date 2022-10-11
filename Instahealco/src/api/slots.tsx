import client from "./client";

const endPoint = "/slots";

const getSchedule = (user_id: number) => client.get(endPoint + "/getSchedule/"+ user_id);
const getBookedSlots = (seller_id:number, selected_date: string) => client.get(endPoint + "/getSlots/" + seller_id + "/" + selected_date)

export default {
  getSchedule,
  getBookedSlots
}