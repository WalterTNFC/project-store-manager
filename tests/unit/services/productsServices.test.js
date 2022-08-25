const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/produtsModel');
const productsService = require('../../../services/productsServices');

describe('Testa a camada service de products', () => {
  describe('Testa a busca de produtos por id', () => {

    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          id: 1,
          name: 'Produto #01'
        });
      });

      after(async () => sinon.stub(productsModel.getById.restore()));

      it('Verifica se retorna um objeto', async () => {
        const response = await productsService.getById(1);
        expect(response).to.be.an('object');
      });

      it('Verifica se retorna um objeto com as chaves code e data', async () => {
        const response = await productsService.getById(1);
        expect(response).to.have.keys('code', 'data');
      });

      it('Verifica se a chave data retorna um objeto', async () => {
        const response = await productsService.getById(1);
        expect(response.data).to.be.an('object');
      });

    });

    describe('Testa em caso de falha', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(async () => productsModel.getById.restore());

      it('Verifica se retorna um objeto de erro', async () => {
        const response = await productsService.getById(999);
        expect(response).to.have.key('error');
      });

    });

  });

  describe('Testa a atualização de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          true: true,
        });

        sinon.stub(productsModel, 'updateProduct').resolves({
          id: 1,
          name: 'Produto #01',
        });
      });

      after(async () => {
        productsModel.getById.restore();
        productsModel.updateProduct.restore();
      });

      it('Verifica se retona um objeto com duas chaves', async () => {
        const response = await productsService.updateProduct(1, 'Produto #01');
        expect(response).to.be.an('object');
        expect(response).to.have.keys('code', 'data');
      });

    });
  });

  describe('Testa a exclusão de um produto', () => {
    describe('Testa em caso de sucesso', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves({
          true: true,
        });

        sinon.stub(productsModel, 'deleteProduct').resolves();
      });

      after(async () => {
        productsModel.getById.restore();
        productsModel.deleteProduct.restore();
      });

      it('Verifica se retona um obejto com code 204', async () => {
        const response = await productsService.deleteProduct(1);
        expect(response).to.be.an('object');
        expect(response).to.have.key('code');
      });
    });

    describe('Testa em caso de erro', () => {

      before(async () => {
        sinon.stub(productsModel, 'getById').resolves(undefined);
      });

      after(async () => {
        productsModel.getById.restore();
      });

      it('Verifica se retona um obejto de erro', async () => {
        const response = await productsService.deleteProduct(1);
        expect(response).to.be.an('object');
        expect(response).to.have.key('error');
      });

    });
  });

  describe('Testa a busca de um produto por nome', () => {
    describe('Testa caso passo um nome válido', () => {

      before(async () => {
        sinon.stub(productsModel, 'searchProduct').resolves([{
          id: 1,
          name: 'Produto #01'
        }]);
      });

      after(async () => productsModel.searchProduct.restore());

      it('Verifica se retorna um objeto', async () => {
        const response = await productsService.searchProduct('Produto');
        expect(response).to.have.keys('code', 'data');
      });

    });

    describe('Testa caso passo um nome inválido', () => {

      before(async () => {
        sinon.stub(productsModel, 'getAll').resolves([{
          id: 1,
          name: 'Produto #01'
        }]);
      });

      after(async () => productsModel.getAll.restore());

      it('Verifica se retorna um objeto', async () => {
        const response = await productsService.searchProduct('');
        expect(response).to.have.keys('code', 'data');
      });

    });
  });
});