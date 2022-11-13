/// <reference types="cypress" />

const serverURL = 'http://127.0.0.1:8080/';
const frontendURL = 'http://127.0.0.1:5173/';

import axios from "axios";

describe('Bookish application', function(){
  before(() => {
    return axios.delete(`${serverURL}books?_cleanup=true`)
    .catch((err) => err)
  })

  afterEach(() => {
    return axios.delete(`${serverURL}books?_cleanup=true`)
    .catch((err) => err)
  })

 beforeEach(() => {
  const books = [
    {name: 'Refactoring', id: 1},
    {name: 'Domain-driven design', id: 2},
    {name: 'Building Microservices', id: 3}
  ]
  return books.map(item => axios.post(`${serverURL}books`, item, 
  {headers: { 'Content-Type': "application/json"}}))
 })

  it('Visists the bookish', function(){
    cy.visit(frontendURL);
    cy.get('h2[data-test="heading').contains('Bookish');
  })

  it('Shows a book list', () => {
    cy.visit(frontendURL);
    cy.get('div[data-test="book-list"]').should('exist');
    cy.get('div.book-item').should('have.length', 3);
    cy.get('div.book-item').should((books)=> {
      expect(books).to.have.length(3);
      const titles = [...books].map(x => x.querySelector('h2')!.innerHTML);
      
      expect(titles).to.deep.equal(['Refactoring',  'Domain-driven design',  'Building Microservices',])
    })
  })
  it('opens the detail page', () => {
    cy.visit(frontendURL);
    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains('Refactoring');
  })
})