/// <reference types="cypress" />

const serverURL = 'http://127.0.0.1:8080/';
const frontendURL = 'http://127.0.0.1:5173/';

import axios from "axios";

const gotoApp = () =>{
  cy.visit(frontendURL);
}

const checkAppTitle = () => {
  cy.get('h2[data-test="heading"]').contains('Bookish');
}

const checkBookListWith = (expectation:string[] = []) =>{
  cy.get('div[data-test="book-list"]').should('exist');
  cy.get('div.book-item').should((books) => {
    expect(books).to.have.length(expectation.length);
    const titles = [...books].map(x => x.querySelector('h2')!.innerHTML);
    expect(titles).to.deep.equal(expectation);
  });
}

const checkBookList = () => {
  const bookList = ['Refactoring', 'Domain-driven design', 
  'Building Microservices', 'Acceptance Test Driven Development with React'];
  checkBookListWith(bookList);
}

const checkSearchResult = () => {
  const expectation = ['Domain-driven design'];
  checkBookListWith(expectation);
}

describe('Bookish application', function(){
// This is no longer needed since we addeed the books.json to the stub-server
//   before(() => {
//     return axios.delete(`${serverURL}books?_cleanup=true`)
//     .catch((err) => err)
//   })

//   afterEach(() => {
//     return axios.delete(`${serverURL}books?_cleanup=true`)
//     .catch((err) => err)
//   })

//  beforeEach(() => {
//   const books = [
//     {name: 'Refactoring', id: 1},
//     {name: 'Domain-driven design', id: 2},
//     {name: 'Building Microservices', id: 3}
//   ]
//   return books.map(item => axios.post(`${serverURL}books`, item, 
//   {headers: { 'Content-Type': "application/json"}}))
//  })

  it('Visists the bookish', function(){
    gotoApp();
    checkAppTitle();
  })

  it('Shows a book list', () => {
    gotoApp();
    cy.get('div[data-test="book-list"]').should('exist');
    checkBookList();
  })
  it('opens the detail page', () => {
    gotoApp();
    cy.get('div.book-item').contains('View Details').eq(0).click();
    cy.url().should('include', '/books/1');
    cy.get('h2.book-title').contains('Refactoring');
  })
  it('Searches for a title', () =>{
    gotoApp();
    cy.get('div.book-item').should('have.length', 4);
    cy.get('[data-test="search"] input').type('design');
    checkSearchResult();
    // cy.get('div.book-item').should('have.length', 1);
    // cy.get('div.book-item').eq(0).contains('Domain-driven design');
  })
})