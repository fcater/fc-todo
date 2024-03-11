export { default } from 'next-auth/middleware';

export const config = {
    matcher: [
        '/todos/new',
        '/todos/edit/:id+'
    ]
}