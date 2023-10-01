const router = require('../../routes/loanRoutes');

describe('Test loan router', () => {
    const getRoutes = [
        { path: '/', method: 'get' },
        { path: '/:id', method: 'get' },
        { path: '/customer/:id', method: 'get' },
    ];
    const postRoute = { path: '/', method: 'post'};
    const patchRoute = { path: '/:id', method: 'patch'};
    const putRoute = { path: '/:id', method: 'put'};
    const deleteRoute = { path: '/:id', method: 'delete'};
  
    it("the GET methods should exist on the loanRouter", async () => {
        getRoutes.forEach(route => {
            expect(router.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true);
            expect(router.stack.some((s) => s.route.path === route.path)).toBe(true);
        });
    });

    it("the POST method should exist on the loanRouter", async () => {
        expect(router.stack.some((s) => Object.keys(s.route.methods).includes(postRoute.method))).toBe(true);
        expect(router.stack.some((s) => s.route.path === postRoute.path)).toBe(true);
    });

    it("the PATCH method should exist on the loanRouter", async () => {
        expect(router.stack.some((s) => Object.keys(s.route.methods).includes(patchRoute.method))).toBe(true);
        expect(router.stack.some((s) => s.route.path === patchRoute.path)).toBe(true);
    });

    it("the PUT method should exist on the loanRouter", async () => {
        expect(router.stack.some((s) => Object.keys(s.route.methods).includes(putRoute.method))).toBe(true);
        expect(router.stack.some((s) => s.route.path === putRoute.path)).toBe(true);
    });

    it("the DELETE method should exist on the loanRouter", async () => {
        expect(router.stack.some((s) => Object.keys(s.route.methods).includes(deleteRoute.method))).toBe(true);
        expect(router.stack.some((s) => s.route.path === deleteRoute.path)).toBe(true);
    });
});