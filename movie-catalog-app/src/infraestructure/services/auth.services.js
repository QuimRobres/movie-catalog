import { http } from "../plugins/http/http";

const saveUser = (user) => {
  window.localStorage.setItem("token", user.id);
};
export const authServices = () => ({
  login: async (body) => {
    let returnValue = "";
    await http
      .post("/login", body)
      .then((user) => {
        saveUser(user);
        returnValue = "success";
      })
      .catch((err) => {
        console.error(err);
        if (err?.response?.data?.message)
          returnValue = err?.response?.data?.message;
        else
          returnValue =
            "There was an error while trying to login. Try it again in a few minutes";
      });
    return returnValue;
  },
  signup: async (body) => {
    let returnValue = "";
    await http
      .post("/signup", body)
      .then((user) => {
        saveUser(user);
        returnValue = "success";
      })
      .catch((err) => {
        console.error(err);
        if (err?.response?.data?.message)
          returnValue = err?.response?.data?.message;
        else
          returnValue =
            "There was an error while trying to signup. Try it again in a few minutes";
      });
    return returnValue;
  },

  logout: async () => {
    let returnValue = "";
    await http.post("/logout").then((res) => {
      localStorage.removeItem("token");
      returnValue = res.message;
    });
    return returnValue;
  },
});
