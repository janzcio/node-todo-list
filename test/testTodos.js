const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  // Assuming your app entry point is named 'app.js'

chai.use(chaiHttp);
const expect = chai.expect;

describe('Todo API', () => {
    // Test for GET /todos
    it('should get a list of todos paginated', (done) => {
        const perPage = 10;  // Set the number of items per page
        const page = 1;      // Set the page number

        chai.request(app)
            .get('/todos')
            .query({ per_page: perPage, page: page })  // Pass query parameters
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
    });

    // Test for POST /todos
    it('should create a new todo', (done) => {
        const todo = {
          title: 'Test Todo',
          done: false,
        };
      
        chai.request(app)
          .post('/todos')
          .send(todo)
          .end((err, res) => {
            expect(res).to.have.status(201);
            done();
          });
    });


    // Test for GET /todos/:id
    it('should get a specific todo by ID', (done) => {
        const todoId = 4;  // Replace with a valid todo ID
        
        chai.request(app)
            .get(`/todos/${todoId}`)
            .end((err, res) => {
            expect(res).to.have.status(200);    
            // expect(res.data).to.be.an('object');
            // expect(res.data.id).to.equal(todoId);
            done();
            });
    });

    // Test for PATCH /todos/:id
    it('should update a todo by ID', (done) => {
        const todoId = 4;  // Replace with a valid todo ID
        const updatedTodo = {
            title: 'Updated Todo',
            done: true,
        };
        
        chai.request(app)
            .patch(`/todos/${todoId}`)
            .send(updatedTodo)
            .end((err, res) => {
            expect(res).to.have.status(200);
            done();
            });
    });

    // Test for DELETE /todos/:id
    it('should delete a todo by ID', (done) => {
        const todoId = 4;  // Replace with a valid todo ID
      
        chai.request(app)
          .delete(`/todos/${todoId}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    });
});