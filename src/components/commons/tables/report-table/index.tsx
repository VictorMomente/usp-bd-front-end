import React from 'react'
import DataTable from 'react-data-table-component'
import { Container } from './styles'

const ReportContent: React.FC<any> = (content): any => {
  const data = content.json
  const columnTemplate = data[0]
  const columns = [] as Array<any>

  Object.keys(columnTemplate).forEach((current: any) => {
    const capitalized = current.charAt(0).toUpperCase() + current.slice(1)
    const column: any = { name: capitalized }
    column.selector = (row: any) => row[current]
    columns.push(column)
  })

  return (
    <Container>
      <DataTable columns={columns} data={data} />
    </Container>
  )
}

export default ReportContent
