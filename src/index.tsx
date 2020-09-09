import type { FC } from 'react'
import * as React from 'react'
import { Children, Fragment } from 'react'

export default function Layout({
  children,
  default: DefaultLayout,
  ...props
}: {
  children: JSX.Element
  default?: FC
}): JSX.Element {
  const child = Children.only(children)
  /**
   * child.type is string | JSXElementConstructor, but we can assume FC,
   * because the child is a page component
   */
  const Component = child.type as FC & { Layout?: FC | unknown }
  const LayoutComponent =
    typeof Component.Layout === 'function'
      ? Component.Layout
      : DefaultLayout || Fragment
  return <LayoutComponent {...props}>{children}</LayoutComponent>
}
