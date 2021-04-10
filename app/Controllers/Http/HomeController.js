'use strict'
//getting the model
const Home = use('App/Models/Home')
class HomeController {
    async home({view}) {
        // Fetch an item
        const homes = await Home.all();
        //const homeSpaces = await HomeSpace.query().where('home_id', 8).fetch();

        return view.render('index', { homes: homes.toJSON() })
    }

}

module.exports = HomeController
