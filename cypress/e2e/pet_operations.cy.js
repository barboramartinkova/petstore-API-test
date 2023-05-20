describe("basic pet operations", () => {
  it("can create a new pet", () => {
    cy.fixture("pet.json").then((data) => {
      cy.createPet(data).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).has.property("id", data.id);
        expect(response.body.category).has.property("name", data.category.name);
        expect(response.body).has.property("name", data.name);
        expect(response.body.tags[0]).has.property("name", data.tags[0].name);
        expect(response.body.photoUrls[0]).contains(data.photoUrls[0]);
        expect(response.body).has.property("status", data.status);
      });
    });
  });

  it("can get pet's information", () => {
    cy.fixture("pet.json").then((petData) => {
      cy.createPet(petData)
        .then((createPetResponse) => {
          expect(createPetResponse.status).to.eq(200);
        })
        .then((createPetResponse) => {
          const id = createPetResponse.body.id;
          cy.getPet(id).then((getPetResponse) => {
            expect(getPetResponse.status).to.eq(200);
            expect(getPetResponse.body).has.property("id", id);
          });
        });
    });
  });

  it("can update the pets info", () => {
    cy.fixture("pet.json").then((petData) => {
      cy.createPet(petData)
        .then((createPetResponse) => {
          expect(createPetResponse.status).to.eq(200);
        })
        .then((createPetResponse) => {
          petData.status = "sold";
          petData.id = createPetResponse.body.id;
          cy.updatePet(petData)
            .then((updatePetResponse) => {
              expect(updatePetResponse.status).to.eq(200);
              expect(updatePetResponse.body).has.property("status", "sold");
            })
            .then((updatePetResponse) => {
              const petId = updatePetResponse.body.id;
              cy.getPet(petId).then((getPetResponse) => {
                expect(getPetResponse.status).to.eq(200);
                expect(getPetResponse.body.status).to.eq("sold");
              });
            });
        });
    });
  });

  it("filters pets by status", () => {
    const statuses = ["available", "pending", "sold"];

    statuses.forEach((status) => {
      cy.getPetBy(status).then((response) => {
        response.body.forEach((pet) => {
          expect(pet.status).to.eq(status);
        });
      });
    });
  });
});
