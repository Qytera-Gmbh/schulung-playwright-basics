import test from "@playwright/test";

test("send api request", async ({ request }) => {
    let response = await request.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(await response.text());

    response = await request.post("https://jsonplaceholder.typicode.com/posts", {
        data: {
            title: 'foo',
            body: 'bar',
            userId: 1,
          }
    })
    console.log(await response.text());
});