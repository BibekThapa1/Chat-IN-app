import { createClient } from "@supabase/supabase-js";
import conf from "../conf/config";

export class DbService {
  supabase;
  constructor() {
    this.supabase = createClient(conf.supabaseUrl, conf.supabaseKey);
  }

  async getUserData(id) {
    const { data, error } = await this.supabase
      .from("users")
      .select()
      .eq("id", id);

    if (data) {
      console.log(data);
      return data;
    } else {
      console.log("error occured", error);
    }
  }

  async searchUsers(prefix) {
    const { data, error } = await this.supabase
      .from("users")
      .select()
      .textSearch("userName", `${prefix}`);
    if (data) return data;
    else if (error) return null;
  }

  async allFriends(id) {
    const { data, error } = await this.supabase
      .from("users")
      .select()
      .textSearch("id", `${id}`);
    if (data) return data;
    else if (error) return null;
  }

  async addFriend(ownId, friendId) {
    const data = await this.getUserData(friendId);
    console.log(data);
    console.log(ownId);
    const response = await this.supabase
      .from("friends")
      .update([{ friendsList: data }])
      .eq("id", ownId)
      .select();
    console.log(response);
  }

  async getAllFriends(id) {
    const data = await this.supabase
      .from("friends")
      .select("friendsList")
      .eq("id", id);
    console.log(data.data[0].friendsList);
    if (data) return data.data[0].friendsList;
  }

  async addToRecent(ownId, friendId, data) {
    // Updating the Own recent section in supabase
    await this.supabase
      .from("messages")
      .update([{ recentSection: data }])
      .eq("id", ownId)
      .select();
    // Updating the friend recent section
    await this.supabase
      .from("messages")
      .update([{ recentSection: data }])
      .eq("id", friendId)
      .select();
  }

  async getRecentSection(id) {
    const data = await this.supabase
      .from("messages")
      .select("recentSection")
      .eq("id", id);
    if (data) return data;
    else return null;
  }

  async uploadImages(userId , file, bucketName) {
    console.log(bucketName)
    const { data, error } = await this.supabase.storage
      .from("sentImages")
      .upload( userId + "/", file);
    if (data) {
      return data;
    } else {
     console.log(error)
    }
  }
}

const dbService = new DbService();
export default dbService;
