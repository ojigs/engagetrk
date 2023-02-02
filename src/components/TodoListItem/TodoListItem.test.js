import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TodoListItem from "./TodoListItem";
import { Provider } from "react-redux";
import store from "../services/store";

const testTodoItems = [
  {
    id: 1,
    todo: "Test Todo Item 1",
  },
  {
    id: 2,
    todo: "Test Todo Item 2",
  },
];

// describe("TodoList", () => {
//   test("should return todo list", () => {
//     let todoItem1 = "something";
//     expect(todoItem1).toBeInTheDocument();
//   });
// });

describe("TodoListItem", () => {
  let utils = () =>
    render(
      <Provider store={store}>
        <TodoListItem />
      </Provider>
    );

  // beforeEach(() => {
  //   utils = render(
  //     <Provider store={store}>
  //       <TodoListItem />
  //     </Provider>
  //   );
  // });

  it("should render the TodoListItem", () => {
    utils();
    store.dispatch({ type: "FETCH_TODOS", payload: testTodoItems });
    const todoItem1 = screen.getByText("Test Todo Item 1");
    const todoItem2 = screen.getByText("Test Todo Item 2");
    expect(todoItem1).toBeInTheDocument();
    expect(todoItem2).toBeInTheDocument();
  });
});

// 1. The first two lines import the necessary libraries for creating a unit test for the TodoListItem component.
// 2. The third line imports the TodoListItem component.
// 3. The fourth line imports the Provider component from react-redux, which allows us to access the redux store.
// 4. The fifth line imports the createStore function from redux, which allows us to create a redux store.
// 5. The sixth line imports the todo reducer, which contains all the reducer logic for the todo app.
// 6. The seventh line creates a redux store using the todo reducer.
// 7. The eighth line creates an array of test todos which will be used for the test.
// 8. The ninth line is the beginning of the describe block for the TodoListItem component.
// 9. The tenth line sets up the beforeEach hook, which is a function that will be run before each test. This is where we render the component with the mock store.
// 10. The eleventh line is the beginning of the it block, which contains our actual test.
// 11. The twelfth line dispatches an action to the redux store with the test todos.
// 12. The thirteenth line uses the render method from the @testing-library/react library to get access to methods which will help us make assertions about the component.
// 13. The fourteenth line uses the getByText method to get a reference to the first todo item.
// 14. The fifteenth line uses the getByText method to get a reference to the second todo item.
// 15. The sixteenth line asserts that the first todo item is present in the document.
// 16. The seventeenth line asserts that the second todo item is present in the document.
