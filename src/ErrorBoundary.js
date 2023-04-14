import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true, error })
  }

  render () {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <pre>
            {JSON.stringify(this.state.error, null, 3)}
          </pre>
        </>
      )
    }
    return this.props.children
  }
}
