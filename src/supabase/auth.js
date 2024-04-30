import conf from "../conf/config";
import { createClient } from "@supabase/supabase-js";

export class AuthService {
  supabase;

  constructor() {
    this.supabase = createClient(conf.supabaseUrl, conf.supabaseKey);
  }

  async signUp({ email, password, userName }, image, bucketName, uid) {
    try {
      const response = await this.supabase.auth.signUp({
        email,
        password,
      });
      if (response.data.user) {
        const id = response.data.user.id;
        const imageResponse = await this.supabase.storage
          .from(bucketName)
          .upload(id + "/" + uid, image);
        const imagePath = `https://ourvhgbvgfgyitosfspy.supabase.co/storage/v1/object/public/${imageResponse.data.fullPath}`;

        const data = await this.addUserInList(
          response.data.user,
          userName,
          imagePath
        );
        if (data) {
          return id;
        } else {
          return false;
          console.log("error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addUserInList({ id, ...props }, userName, imageUrl) {
    const response = await this.supabase
      .from("users")
      .insert([{ imageUrl, userName, otherData: { ...props }, id }]);
    if (response) {
      const data = await this.supabase.from("friends").insert([{ id }]);
      await this.supabase.from("messages").insert([{ id }]);
      return true;
    } else {
      return false;
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

  async logout() {
    await this.supabase.auth.signOut();
  }
}

const authService = new AuthService();

export default authService;
