import { createClient } from "@supabase/supabase-js";
import conf from "../conf/config";
// import { storage } from "@supabase/supabase-js";

export class DbService {
  supabase;
  constructor() {
    this.supabase = createClient(conf.supabaseUrl, conf.supabaseKey);
  }

  supabaseClient() {
    return this.supabase;
  }

  async subscribeChannel(table,msgId) {
    let messages;
    this.supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        (payload) => {
          messages = payload;
          console.log(messages)
    }
      )
      .subscribe();
    return messages;
  }

  async getUserData(id) {
    console.log(this.supabase);
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

  async allUser() {
    const { data, error } = await this.supabase.from("users").select();
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

  async getSpecificData(userId, tableName, columnName) {
    let { data } = await this.supabase
      .from(`${tableName}`)
      .select(`${columnName}`)
      .eq("id", userId);
    if (data) return data;
    else [];
  }

  async addToRecent(ownId, friendId, msg = "") {
    // Fetching own resentSection Data
    let { data } = await this.supabase
      .from("messages")
      .select("recentSection")
      .eq("id", ownId);
    let recentSectionData = data[0].recentSection;
    recentSectionData = recentSectionData.filter((d) => d.id != friendId);

    let friendData = await this.getUserData(friendId);
    console.log(friendData);
    let updateData = [
      {
        id: friendData[0].id,
        userName: friendData[0].userName,
        imageUrl: friendData[0].imageUrl,
        msg,
      },
      ...recentSectionData,
    ];
    // Updating the Own recent section in supabase
    await this.supabase
      .from("messages")
      .update([{ recentSection: updateData }])
      .eq("id", ownId)
      .select();

    // Updating the friend recent section
    if (msg) {
      let { data } = await this.supabase
        .from("messages")
        .select("recentSection")
        .eq("id", friendId);
      let recentSectionData = data[0].recentSection;
      recentSectionData = recentSectionData.filter((d) => d.id != ownId);

      let ownData = await this.getUserData(ownId);

      updateData = [
        {
          id: ownId,
          userName: ownData[0].userName,
          imageUrl: ownData[0].imageUrl,
          msg,
        },
        ...recentSectionData,
      ];

      await this.supabase
        .from("messages")
        .update([{ recentSection: updateData }])
        .eq("id", friendId)
        .select();
    }
  }

  async getRecentSection(id) {
    const data = await this.supabase
      .from("messages")
      .select("recentSection")
      .eq("id", id);
    if (data) return data;
    else return null;
  }

  async uploadImages(id, file, bucketName, uid) {
    const response = await this.supabase.storage
      .from(bucketName)
      .upload(id + "/" + uid, file);
    console.log(response);
    return response;
  }

  async updateMessage(ownId, friendId, msg, msgId, time, sentImageLink) {
    // Own database
    let { data } = await this.supabase
      .from("messages")
      .select("messages")
      .eq("id", ownId);
    console.log(data);
    let messagesData = data[0].messages;
    console.log(messagesData);
    let updateData = [
      ...messagesData,
      {
        msgId,
        imageUrl: sentImageLink,
        msg,
        time,
        received: false,
      },
    ];
    await this.supabase
      .from("messages")
      .update([{ messages: updateData }])
      .eq("id", ownId)
      .select();

    // Friend database
    // retreiving friend messages column from supabase
    let response = await this.supabase
      .from("messages")
      .select("messages")
      .eq("id", friendId);
    messagesData = response.data[0].messages;
    console.log(response);
    console.log(response.data[0].messages);

    // Updating the friend data
    updateData = [
      ...messagesData,
      {
        msgId,
        imageUrl: sentImageLink,
        msg,
        time,
        received: true,
      },
    ];
    //  Updating friend message column in database
    await this.supabase
      .from("messages")
      .update([{ messages: updateData }])
      .eq("id", friendId)
      .select();

    await this.addToRecent(ownId, friendId, msg);
  }

  async updateData(tableName, keyValue, id) {
    console.log(keyValue);
    const response = await this.supabase
      .from(tableName)
      .update({ imageUrl: keyValue })
      .eq("id", id)
      .select();
    console.log(response);
  }
}

const dbService = new DbService();
export default dbService;
