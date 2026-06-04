import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: false
  }
  const mockHandler = vi.fn()

  render(<Todo todo={todo} onClickDelete={mockHandler} onClickComplete={mockHandler} />)

  const textElement = screen.getByText('Component testing is done with react-testing-library')
  const doneElement = screen.getByText('Set as done')

  expect(textElement).toBeDefined()
  expect(doneElement).toBeDefined()
})