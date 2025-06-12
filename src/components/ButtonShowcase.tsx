'use client';

import Button from './Button';

export default function ButtonShowcase() {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component Showcase</h1>
      
      {/* Variants */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading Primary</Button>
          <Button variant="outline" isLoading>Loading Outline</Button>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
      </section>

      {/* Hero Variant on Dark Background */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Hero Variant</h2>
        <div className="bg-black p-8 rounded-lg">
          <Button variant="hero" size="xl">Boka tid</Button>
        </div>
      </section>

      {/* Custom onClick Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Interactive Examples</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => alert('Primary clicked!')}>
            Click Me (Primary)
          </Button>
          <Button 
            variant="outline" 
            onClick={() => console.log('Outline button clicked')}
          >
            Log to Console
          </Button>
        </div>
      </section>
    </div>
  );
} 