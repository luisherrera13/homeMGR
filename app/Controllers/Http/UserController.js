"use strict";
const User = use("App/Models/User");
class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(["username", "email", "password", "home"])
    );

    // Find a user by user id and save needed values to home table
    const homeValues = await User.find(user.id);
    await homeValues.homes().create({ home_name: user.home });
    await auth.login(user);
    return response.redirect("/", true);
  }
  async login({ request, auth, response, session }) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      return response.redirect("/", true);
    } catch (error) {
      session.flash({ loginError: "Estas credenciales no funcionan." });
      return response.redirect("/login", true);
    }
  }
}

module.exports = UserController;
