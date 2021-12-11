const AddUserUseCase = require('../../../../Application/use_case/AddUserUseCase');
const DomainErrorTranslator = require('../../../../Commons/exceptions/DomainErrorTranslator');

class UsersHandler {
  constructor(container) {
    this._container = container;

    this.postUserhandler = this.postUserhandler.bind(this);
  }

  async postUserhandler(request, h) {
    try {
      const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
      const addedUser = await addUserUseCase.execute(request.payload);

      const response = h.response({
        status: 'success',
        data: {
          addedUser,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const translatedError = DomainErrorTranslator.translate(error);

      const response = h.response({
        status: 'fail',
        message: translatedError.message,
      });
      response.code(translatedError.statusCode);
      return response;
    }
  }
}

module.exports = UsersHandler;
