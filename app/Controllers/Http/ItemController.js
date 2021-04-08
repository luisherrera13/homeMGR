'use strict'
const Item = use('App/Models/Item')
class ItemController {
    async home({view}) {

        // Create an item
        //const item = new Item;
        //item.title = 'My item name';
        //item.link = 'http://google.com';
        //item.description = 'My item description';

        //await item.save();

        // Fetch an item
        const items = await Item.all();

        return view.render('index', { items: items.toJSON() })
    }
}

module.exports = ItemController
