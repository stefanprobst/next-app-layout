# next-app-layout

A tiny component to add persistent layouts to a Next.js app.

## How to use

Page components can add a static `Layout` property on the default export which
will be used by `next-app-layout` as persistent layout.

### Layout component in pages/\_app.tsx

To render the layout, place thw following in `pages/_app.tsx`:

```ts
import Layout from '@stefanprobst/next-app-layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps}>
    </Layout>
  )
}
```

The `Layout` component accepts a `default` prop, which will be rendered if no
`Component.Layout` prop is found.

```ts
import Layout from '@stefanprobst/next-app-layout'
import type { AppProps } from 'next/app'
import PageLayout from 'layouts/PageLayout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout default={PageLayout}>
      <Component {...pageProps}>
    </Layout>
  )
}
```

All additional props passed to `Layout` will be passed on to the layout
component.

### Defining a page layout

In a page component, add the following:

```ts
import CustomLayout from 'layouts/CustomLayout'

export default function AboutPage() {
  return <h1>About</h1>
}

AboutPage.Layout = CustomLayout
```

To explicitly render _no_ persistent layout component (i.e. also bybassing any
default layout defined with `<Layout default={DefaultLayout}>`), set the Layout
to `React.Fragment`:

```ts
AboutPage.Layout = React.Fragment
```

### A note on react refresh

Hot reloading with react refresh will work, as long as the layout component is
imported from another file. Defining the layout component in the same file as
the page component will not work with react refresh, as it does not register
changes on static function properties.
