'use strict'

class CreateUser {
  get rules () { //validation rules
    return {
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} es requerido.',
      'unique': '{{ field }} ya existe'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    
    return this.ctx.response.redirect('back');
  }

}


module.exports = CreateUser
