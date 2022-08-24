const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsServices')
const productsController = require('../../../controllers/productsControllers');

const req = {};
const res = {};
let next = new Function;

describe('Testa a camada controller de products', () => {
	describe('Testa a busca por todos os produtos', () => {
		describe('Testa em caso de sucesso', () => {

			before(async () => {
				sinon.stub(productsService, 'getAll').resolves({
					code: 200,
					data: {},
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getAll.restore());

			it('Verifica se retorna o status 200', async () => {
				await productsController.getAll(req, res, next);
				expect(res.status.calledWith(200)).to.be.true;
			});
		});
	});

	describe('Testa a busca de produto por id', () => {
		describe('Testa em caso de sucesso', () => {

			req.params = { id: 1 }

			before(async () => {
				sinon.stub(productsService, 'getById').resolves({
					code: 200,
					data: {},
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

			it('Verifica se retorna status 200', async () => {
				await productsController.getById(req, res, next)
				expect(res.status.calledWith(200)).to.be.true;
			});

		});

		describe('Testa em caso de falha', () => {

			req.params = { id: 999 }

			before(async () => {
				sinon.stub(productsService, 'getById').resolves({
					error: {
						code: 404,
						message: 'Product not found',
					}
				});

				res.status = sinon.stub().returns(res);
				res.json = sinon.stub().returns();
			});

			after(async () => productsService.getById.restore());

			it('Verifica se retorna status 200', async () => {
				await productsController.getById(req, res, next)
				expect(res.status.calledWith(404)).to.be.true;
			});

		});
  });

  describe('Testa a criação de um produto', () => {

    describe('Testa caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'newProducts').resolves({
          code: 201,
          id: 1,
          name: 'Produto #01',
        });

        req.body = { name: 'Produto #01' };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => productsService.newProducts.restore());

      it('Verifica se chama com status 201', async () => {
        await productsController.newProducts(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
      });
    });
  });

  describe('Testa a atualização de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'updateProduct').resolves({
          code: 200,
          data: {},
        });

        req.params = { id: 1 };
        req.body = { name: 'Produto #01' };
        req.status = sinon.stub().returns(res);
        req.status = sinon.stub().returns();
      });

      after(async () => productsService.updateProduct.restore());

      it('Verifica se o res.status é chamado com 200', async () => {
        await productsController.updateProduct(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsService, 'updateProduct').resolves({
          error: {
            code: 404,
            message: '../',
          }
        });

        req.params = { id: 999 };
        req.body = { name: 'Produto #00x' };
        req.status = sinon.stub().returns(res);
        req.status = sinon.stub().returns();
      });

      after(async () => productsService.updateProduct.restore());

      it('Verifica se o res.status é chamado com 200', async () => {
        await productsController.updateProduct(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });
  });

  describe('Testa a exclusão de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'deleteProduct').resolves({
          code: 204,
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
      });

      after(async () => productsService.deleteProduct.restore());

      it('Verifica se o res.status é chamado com 204', async () => {
        await productsController.deleteProduct(req, res, next);
        expect(res.status.calledWith(204)).to.be.true;
      });
    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsService, 'deleteProduct').resolves({
          error: {
            code: 404,
            message: '../',
          },
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => productsService.deleteProduct.restore());

      it('Verifica se o res.status é chamado com 204', async () => {
        await productsController.deleteProduct(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });
    });
  });

  describe('Testa a busca de produto por nome', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsService, 'searchProduct').resolves({
          code: 200,
          data: [{}],
        });

        req.query = { q: 'Produto #01' };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
      });

      after(async () => productsService.searchProduct.restore());

      it('Verifica se chama o res.status com 200', async () => {
        await productsController.searchProduct(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });
  });
});