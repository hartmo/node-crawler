const Model = require('../mocks/article/list');
const Controller = require('egg').Controller;
const http = require('http');
const url = require('url');
const superagent = require('superagent');
const cheerio = require('cheerio');
class AppController extends Controller {
  async index() {
    await this.ctx.render('app/app.js', {
      url: this.ctx.url.replace(/\/app/, '')
    });
  }
  async book() {
    const { ctx } = this;
    const book = await ctx.service.book.find(1);
    ctx.body = {
      book: book.book
    };
  }
}

module.exports = AppController;
