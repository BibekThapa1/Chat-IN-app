import conf from "../conf/config";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

console.log(conf.supabaseUrl);

export class AuthService {
  supabase;

  constructor() {
    this.supabase = createClient(conf.supabaseUrl, conf.supabaseKey);
  }

  async signUp({ email, password, userName }) {
    try {
      const response = await this.supabase.auth.signUp({
        email,
        password,
      });
      if (response.data.user) {
        console.log(response.data.user);
        return this.addUserInList(response.data.user, userName);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUserInList({ id, ...props }, userName) {
    const { data, error } = await this.supabase
      .from("users")
      .insert([{ imageUrl: "", userName, otherData: { ...props }, id }]);

    if (error) console.log("Error:", error);
    else {
      console.log("Data inserted:", data);
      return true;
    }
  }

  async getUser() {
    try {
      const {
        data: { user },
      } = await this.supabase.auth.getUser();
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;
