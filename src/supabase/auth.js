import conf from "../conf/config";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

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
        console.log(response);
        const data = await this.addUserInList(response.data.user, userName);
        if (data) {
          return response.data.user;
        } else {
          return false;
          console.log("error");
        }
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
     await this.supabase
      .from("friends")
      .insert([{ id  }]);

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

  async login({ email, password }) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (data) {
        return data;
      }
      if (error) throw new Error();
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout(){
     await this.supabase.auth.signOut()
  }

}

const authService = new AuthService();

export default authService;
