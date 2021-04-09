'use strict'
//getting the model
const HomeSpace = use('App/Models/HomeSpace')

class HomeSpaceController {
    async home({view}) {

        // Create an item
       /* const homeSpace = new HomeSpace;
        homeSpace.spaceName = 'Habitacion';
        homeSpace.spaceFunction = 'Descansar';
        homeSpace.home_id = '1';

        await homeSpace.save();*/

        // Fetch an item
        const homeSpaces = await HomeSpace.all();

        return view.render('index', { homeSpaces: homeSpaces.toJSON() })
    }
}



module.exports = HomeSpaceController
