const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesServices');
const salesController = require('../../../controllers/salesControllers');

const req = {};
const res = {};
let next = new Function;

describe('Testa a camada controller de sales', () => {
  describe('Testa a busca por todas as vendas', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'getAll').resolves({
          code: 200,
          data: [{}],
        });

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => salesService.getAll.restore());

      it('Verifica se retorna com status 200', async () => {
        await salesController.getAll(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });
    });
  });

  describe('Testa a busca de vendas por id', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'getById').resolves({
          code: 200,
          data: [{}],
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(); 
      });

      after(async () => salesService.getById.restore());

      it('Verifica se retona com status 200', async () => {
        await salesController.getById(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesService, 'getById').resolves({
          error: {
            code: 404,
            message: '..',
          }
        });

        req.params = { id: 1 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => salesService.getById.restore());

      it('Verifica se retona com status 404', async () => {
        await salesController.getById(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });

    });
  });

  describe('Testa a cria????o de um venda', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'createSale').resolves({
          code: 201,
          data: '../',
        });

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        salesService.createSale.restore();
      });

      it('Verifica se chama o res.status com 201', async () => {
        await salesController.createSale(req, res, next);
        expect(res.status.calledWith(201)).to.be.true;
      });

    });
  });

  describe('Testa excluir uma venda', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'deleteSale').resolves({
          code: 204,
        });

        req.params = { id: 3 };
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
      });

      after(async () => {
        salesService.deleteSale.restore();
      });

      it('Verifica se chama o res.status com 204', async () => {
        await salesController.deleteSale(req, res, next);
        expect(res.status.calledWith(204)).to.be.true;
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesService, 'deleteSale').resolves({
          error: {
            code: 404,
            message: '../',
          }
        });

        req.params = { id: 99 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        salesService.deleteSale.restore();
      });

      it('Verifica se chama o res.status com 404', async () => {
        await salesController.deleteSale(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });

    });
  });

  describe('Testa atualizar uma venda', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(salesService, 'updateSale').resolves({
          code: 200,
          data: [{}],
        });

        req.params = { id: 3 };
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        salesService.updateSale.restore();
      });

      it('Verifica se chama o res.status com 200', async () => {
        await salesController.updatesale(req, res, next);
        expect(res.status.calledWith(200)).to.be.true;
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(salesService, 'updateSale').resolves({
          error: {
            code: 404,
            message: '../',
          }
        });

        req.params = { id: 3 };
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
      });

      after(async () => {
        salesService.updateSale.restore();
      });

      it('Verifica se chama o res.status com 404', async () => {
        await salesController.updatesale(req, res, next);
        expect(res.status.calledWith(404)).to.be.true;
      });

    });
  });
});