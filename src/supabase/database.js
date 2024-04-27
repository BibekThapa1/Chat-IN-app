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

  async allFriends(id){
    const { data, error } = await this.supabase
      .from("users")
      .select()
      .textSearch("id", `${id}`);
    if (data) return data;
    else if (error) return null;
  }

}

const dbService = new DbService();
export default dbService;
