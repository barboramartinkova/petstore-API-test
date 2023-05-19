describe("basic pet operations", () => {
  it("creates a new order", () => {
    cy.fixture("order.json").then((data) => {
      cy.createOrder(data).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).has.property("id", data.id);
        expect(response.body).has.property("petId", data.petId);
        expect(response.body).has.property("quantity", data.quantity);
        expect(response.body).has.property("shipDate", data.shipDate);
        expect(response.body).has.property("status", data.status);
        expect(response.body).has.property("complete", data.complete);
      });
    });
  });

  it("gets order's info by order ID", () => {
    cy.fixture("order.json").then((data) => {
      cy.createOrder(data).then((createOrderResp) => {
        const id = createOrderResp.body.id;
        cy.getOrder(id).then((getOrderResp) => {
          expect(getOrderResp.status).to.eq(200);
          expect(getOrderResp.body).has.property("id", data.id);
        });
      });
    });
  });

  it.only("can delete an order", () => {
    cy.fixture("order.json").then((data) => {
      cy.createOrder(data).then((createOrderResp) => {
        expect(createOrderResp.status).to.eq(200);
        const id = createOrderResp.body.id;
        cy.deleteOrder(id)
          .then((deletedOrderResp) => {
            expect(deletedOrderResp.status).to.eq(200);
            expect(deletedOrderResp.body).has.property(
              "message",
              id.toString()
            );
          })
          .then(() => {
            cy.getOrder(id).then((getOrderResp) => {
              expect(getOrderResp.status).to.eq(404);
              expect(getOrderResp.body).has.property(
                "message",
                "Order not found"
              );
            });
          });
      });
    });
  });
});
