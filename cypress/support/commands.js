Cypress.Commands.add("createPet", (petData) => {
  cy.request({
    method: "POST",
    url: "https://petstore.swagger.io/v2/pet",
    body: petData,
  });
});

Cypress.Commands.add("getPet", (ID) => {
  cy.request({
    method: "GET",
    url: `https://petstore.swagger.io/v2/pet/${ID}`,
  });
});

Cypress.Commands.add("updatePet", (petData) => {
  cy.request({
    method: "PUT",
    url: "https://petstore.swagger.io/v2/pet",
    body: petData,
  });
});

Cypress.Commands.add("getPetBy", (petStatus) => {
  cy.request("GET", `/pet/findByStatus?status=${petStatus}`);
});

Cypress.Commands.add("createOrder", (order) => {
  cy.request({
    method: "POST",
    url: "https://petstore.swagger.io/v2/store/order",
    body: order,
  });
});

Cypress.Commands.add("getOrder", (id) => {
  cy.request({
    method: "GET",
    url: `https://petstore.swagger.io/v2/store/order/${id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("deleteOrder", (id) => {
  cy.request({
    method: "DELETE",
    url: `https://petstore.swagger.io/v2/store/order/${id}`,
  });
});
