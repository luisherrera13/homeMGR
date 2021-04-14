'use strict'
//getting the model
const Home = use('App/Models/Home')
const User = use('App/Models/User')
class HomeController {
    async home({view, auth}) {
        if(auth.user!==null){
        const homeUser = await User.query().where('id', auth.user.id).fetch();
        var homeUserid=homeUser.toJSON();        
        const homes = await Home.query().where('user_id', homeUserid[0].id).fetch();

        return view.render('index', { homes: homes.toJSON() })}
        else{
            return view.render('index')
        }
    }
    async homeAPI({ params, response}) {
      const homeUser = await User.query().where('id', params.id).fetch();
      var homeUserid=homeUser.toJSON();       
      const homes = await Home.query().where('user_id', homeUserid[0].id).fetch(); 
      var userHome=homes.toJSON();
      return response.json(userHome[0]) }

}
    module.exports = HomeController