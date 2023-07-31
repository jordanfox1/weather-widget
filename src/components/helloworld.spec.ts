import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import HelloWorld from './HelloWorld.vue';

describe('code completion', () => {
    it('completes test code', () => {
        expect(true).toBe(true)
    })
    it('renders something', async () => {
        const component = await render(HelloWorld);
        expect(component).toBeTruthy();
    })
});
