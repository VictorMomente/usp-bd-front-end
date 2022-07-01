import { OverviewMap } from '@services/api/routes/typeOverview'
import React from 'react'
import { Container } from './styles'

const OverviewContent: React.FC<any> = ({ children }): any => {
  return (
    <Container>
      {Object.keys(children).map(current => {
        const test = OverviewMap[current]
        return (
          <p key={current}>
            {test}: {children[current]}
          </p>
        )
      })}
    </Container>
  )
}

export default OverviewContent
