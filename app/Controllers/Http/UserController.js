"use strict";
const User = use("App/Models/User");
const Home = use("App/Models/Home");
class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(["username", "email", "password", "home"])
    );

    // Find a user by user id and save needed values to home table
    const home = await User.find(user.id);
    await home.home().create({ home_name: "home", user_id: "id" });

    await auth.login(user);
    return response.redirect("/");
  }
  async login({ request, auth, response, session }) {
    const { email, password } = request.all();

    try {
      await auth.attempt(email, password);
      return response.redirect("/");
    } catch (error) {
      session.flash({ loginError: "Estas credenciales no funcionan." });
      return response.redirect("/login");
    }
  }
}

module.exports = UserController;
