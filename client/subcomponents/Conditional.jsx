import React from 'react'

export default function Conditional(props) {
  return props.condition ? <>{props.children}</> : null
}