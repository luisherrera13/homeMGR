'use strict'
const Item = use('App/Models/Item')
class ItemController {
    async home({view, params}) {

        // Create an item
        //const item = new Item;
        //item.title = 'My item name';
        //item.link = 'http://google.com';
        //item.description = 'My item description';

        //await item.save();

        // Fetch an item
        //const items = await Item.all();
        const items = await Item.query().where('home_space_id', params.id).fetch();
        return view.render('lists/items', { items: items.toJSON() })
    }
}

module.exports = ItemController
